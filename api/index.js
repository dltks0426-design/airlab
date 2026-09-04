const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const BUCKET = 'work-photos';
const TTL = 60 * 60 * 8;
let memoryQuotes = [];
app.use(cors());
app.use(express.json({ limit: '50mb' }));

function env(name) { if (!process.env[name]) throw new Error(name); return process.env[name]; }
function supabase() { return createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } }); }
function configured(res) { try { supabase(); env('ADMIN_PASSWORD'); env('ADMIN_TOKEN_SECRET'); return true; } catch { res.status(503).json({ success:false, message:'관리자 시스템 설정이 아직 완료되지 않았습니다.' }); return false; } }
function sign(payload) { return crypto.createHmac('sha256', env('ADMIN_TOKEN_SECRET')).update(payload).digest('base64url'); }
function token() { const now=Math.floor(Date.now()/1000); const payload=Buffer.from(JSON.stringify({ role:'admin', iat:now, exp:now+TTL })).toString('base64url'); return `${payload}.${sign(payload)}`; }
function validToken(value) { try { const [payload, signature, ...rest]=(value||'').replace(/^Bearer\s+/i,'').split('.'); const expected=sign(payload); if (!payload || !signature || rest.length || signature.length!==expected.length || !crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected))) return false; const data=JSON.parse(Buffer.from(payload,'base64url').toString()); return data.role==='admin' && Number.isInteger(data.exp) && data.exp>Math.floor(Date.now()/1000); } catch { return false; } }
function requireAdmin(req,res,next) { if (!validToken(req.headers.authorization || req.headers['x-admin-token'])) return res.status(401).json({success:false,message:'관리자 인증이 필요하거나 만료되었습니다.'}); next(); }
function item(row) { return { id:row.id,title:row.title,location:row.location,date:row.date,scale:row.scale,photos:Array.isArray(row.photos)?row.photos:[],createdAt:row.created_at,updatedAt:row.updated_at }; }
function typeExt(type) { return {'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[type]; }
async function storePhotos(db,id,photos) {
  if (!Array.isArray(photos)||!photos.length||photos.length>10) throw new Error('사진은 1장 이상 10장 이하로 등록해 주세요.');
  const urls=[];
  for (let i=0;i<photos.length;i++) {
    const value=photos[i];
    if (typeof value!=='string') throw new Error('올바른 사진 파일이 아닙니다.');
    if (!value.startsWith('data:')) { urls.push(value); continue; }
    const found=/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(value);
    if (!found) throw new Error('JPG, PNG, WEBP 사진만 등록할 수 있습니다.');
    const bytes=Buffer.from(found[2],'base64'); if (!bytes.length||bytes.length>8*1024*1024) throw new Error('사진 한 장의 크기는 8MB 이하여야 합니다.');
    const path=`${id}/${Date.now()}-${i}.${typeExt(found[1])}`;
    const {error}=await db.storage.from(BUCKET).upload(path,bytes,{contentType:found[1],upsert:false,cacheControl:'31536000'});
    if (error) throw new Error('사진 업로드에 실패했습니다.');
    urls.push(db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }
  return urls;
}
function values(body,photos) { return { title:body.title.trim(),location:typeof body.location==='string'?body.location.trim():'',date:typeof body.date==='string'?body.date.trim():'',scale:typeof body.scale==='string'?body.scale.trim():'',photos }; }

app.post('/api/admin/login',(req,res)=>{ if(!configured(res))return; const input=typeof req.body.password==='string'?req.body.password:''; const password=env('ADMIN_PASSWORD'); const ok=input.length===password.length&&crypto.timingSafeEqual(Buffer.from(input),Buffer.from(password)); if(!ok)return res.status(401).json({success:false,message:'비밀번호가 일치하지 않습니다.'}); res.json({success:true,token:token(),message:'관리자 로그인 성공'}); });
app.post('/api/admin/logout',(req,res)=>res.json({success:true,message:'로그아웃되었습니다.'}));
app.post('/api/quote/submit',(req,res)=>{ const record={id:`quote-${Date.now()}`,...req.body,submittedAt:new Date().toISOString()}; memoryQuotes.unshift(record); res.json({success:true,message:'견적 문의가 정상 접수되었습니다.'}); });
app.get('/api/work/list',async(req,res)=>{ if(!configured(res))return; try { const {data,error}=await supabase().from('work_cases').select('*').order('created_at',{ascending:false}); if(error)throw error; res.json({success:true,data:data.map(item)}); } catch { res.status(500).json({success:false,message:'시공사례를 불러오지 못했습니다.'}); } });
app.post('/api/work/add',requireAdmin,async(req,res)=>{ if(!configured(res))return; if(typeof req.body.title!=='string'||!req.body.title.trim())return res.status(400).json({success:false,message:'제목은 필수 입력 항목입니다.'}); try { const db=supabase(),id=crypto.randomUUID(),photos=await storePhotos(db,id,req.body.photos); const {data,error}=await db.from('work_cases').insert({id,...values(req.body,photos)}).select().single(); if(error)throw error; res.status(201).json({success:true,data:item(data),message:'시공사례가 등록되었습니다.'}); } catch(error) { res.status(500).json({success:false,message:error.message||'시공사례 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.'}); } });
app.put('/api/work/edit/:id',requireAdmin,async(req,res)=>{ if(!configured(res))return; if(typeof req.body.title!=='string'||!req.body.title.trim())return res.status(400).json({success:false,message:'제목은 필수 입력 항목입니다.'}); try { const db=supabase(); const {data:old,error:findError}=await db.from('work_cases').select('id').eq('id',req.params.id).maybeSingle(); if(findError)throw findError; if(!old)return res.status(404).json({success:false,message:'해당 시공사례를 찾을 수 없습니다.'}); const photos=await storePhotos(db,req.params.id,req.body.photos); const {data,error}=await db.from('work_cases').update(values(req.body,photos)).eq('id',req.params.id).select().single(); if(error)throw error; res.json({success:true,data:item(data),message:'시공사례가 수정되었습니다.'}); } catch(error) { res.status(500).json({success:false,message:error.message||'시공사례 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.'}); } });
app.delete('/api/work/delete/:id',requireAdmin,async(req,res)=>{ if(!configured(res))return; try { const db=supabase(); const {data:old,error:findError}=await db.from('work_cases').select('photos').eq('id',req.params.id).maybeSingle(); if(findError)throw findError; if(!old)return res.status(404).json({success:false,message:'해당 시공사례를 찾을 수 없습니다.'}); const {error}=await db.from('work_cases').delete().eq('id',req.params.id); if(error)throw error; const marker=`/storage/v1/object/public/${BUCKET}/`; const paths=(old.photos||[]).map(url=>typeof url==='string'&&url.includes(marker)?url.split(marker)[1]:null).filter(Boolean); if(paths.length)await db.storage.from(BUCKET).remove(paths); res.json({success:true,message:'시공사례가 삭제되었습니다.'}); } catch { res.status(500).json({success:false,message:'시공사례 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.'}); } });
module.exports=app;
