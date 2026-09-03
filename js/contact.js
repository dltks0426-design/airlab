/**
 * AirLab — Contact & Quote Dispatch Engine
 */

const qtyKeys = ['wall', 'system1w', 'system4w', 'stand', 'outdoor'];

function getQty(key) {
  const el = document.getElementById('qty-' + key);
  return el ? Math.max(0, parseInt(el.value, 10) || 0) : 0;
}

window.changeQty = function(type, delta) {
  const el = document.getElementById('qty-' + type);
  if (el) {
    let current = Math.max(0, parseInt(el.value, 10) || 0);
    current = Math.max(0, current + delta);
    el.value = current;
    updateTotalCount();
  }
};

window.handleManualQtyChange = function() {
  qtyKeys.forEach(k => {
    const el = document.getElementById('qty-' + k);
    if (el && el.value < 0) el.value = 0;
  });
  updateTotalCount();
};

function updateTotalCount() {
  let total = 0;
  qtyKeys.forEach(k => {
    total += getQty(k);
  });

  const badge = document.getElementById('totalQtyBadge');
  if (badge) {
    badge.innerText = '총 신청 대수: ' + total + '대';
    if (total > 0) {
      badge.classList.remove('bg-brand-iceSoft', 'text-brand-ice');
      badge.classList.add('bg-brand-navy', 'text-white');
    } else {
      badge.classList.remove('bg-brand-navy', 'text-white');
      badge.classList.add('bg-brand-iceSoft', 'text-brand-ice');
    }
  }
  return total;
}

window.handleQuoteSubmit = async function(e) {
  e.preventDefault();

  const totalQty = updateTotalCount();
  if (totalQty === 0) {
    alert('신청하실 에어컨 기종의 수량을 최소 1대 이상 [+] 버튼으로 설정해 주세요.');
    return;
  }

  const privacyCheck = document.getElementById('privacy');
  if (!privacyCheck.checked) {
    alert('개인정보 수집 및 이용 동의에 체크해 주세요.');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const facilityType = document.getElementById('facilityType').value;
  const address = document.getElementById('address').value.trim();

  // Build Breakdown
  const breakdown = [];
  const qWall = getQty('wall');
  const q1w = getQty('system1w');
  const q4w = getQty('system4w');
  const qStand = getQty('stand');
  const qOutdoor = getQty('outdoor');

  if (qWall > 0) breakdown.push('벽걸이 ' + qWall + '대');
  if (q1w > 0) breakdown.push('1Way/2Way 천장형 ' + q1w + '대');
  if (q4w > 0) breakdown.push('4Way 천장형 ' + q4w + '대');
  if (qStand > 0) breakdown.push('스탠드 ' + qStand + '대');
  if (qOutdoor > 0) breakdown.push('실외기 ' + qOutdoor + '대');
  const acDetails = breakdown.join(', ') + ' (총 ' + totalQty + '대)';

  const parking = document.querySelector('input[name="parking"]:checked')?.value || '주차 가능';
  const dateVal = document.getElementById('preferredDate').value;
  const timeVal = document.querySelector('input[name="timeSlot"]:checked')?.value || '시간 협의';
  const schedule = (dateVal ? dateVal : '날짜 미지정 (협의)') + ' / ' + timeVal;
  const message = document.getElementById('message').value.trim() || '없음';

  // UI State
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const btnSpinner = document.getElementById('btnSpinner');

  btnText.innerText = '견적서 전송 중...';
  btnIcon.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  submitBtn.disabled = true;

  const payload = {
    _subject: '[에어랩] 새로운 견적 문의가 접수되었습니다: ' + name + ' (' + phone + ')',
    _template: 'table',
    _captcha: 'false',
    '이름': name,
    '전화번호': phone,
    '이메일': email,
    '주소': address,
    '서비스': acDetails,
    '공간구분': facilityType,
    '주차가능': parking,
    '희망일정': schedule,
    '문의내용': message,
    '개인정보동의': '동의함'
  };

  try {
    await fetch('https://formsubmit.co/ajax/airlab_@naver.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('hidden');
  } catch (err) {
    console.error('Submit error:', err);
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('hidden');
  } finally {
    btnText.innerText = '실시간 견적 문의 신청하기';
    btnIcon.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
    submitBtn.disabled = false;
  }
};

window.closeSuccessModal = function() {
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.add('hidden');
  const form = document.getElementById('quoteForm');
  if (form) {
    form.reset();
    qtyKeys.forEach(k => {
      const el = document.getElementById('qty-' + k);
      if (el) el.value = 0;
    });
    updateTotalCount();
  }
};
