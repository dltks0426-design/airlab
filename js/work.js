tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              navy: '#0F2B48',
              navyDark: '#0A1E33',
              navyLight: '#183D65',
              ice: '#00B4D8',
              iceHover: '#0096C7',
              iceLight: '#E0F7FA',
              iceSoft: '#F0F9FF',
              slateBg: '#F8FAFC',
            }
          },
          fontFamily: {
            sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          },
          borderRadius: {
            '2xl': '16px',
            '3xl': '24px',
          },
          boxShadow: {
            'soft': '0 4px 20px -2px rgba(15, 43, 72, 0.06)',
            'card': '0 10px 30px -4px rgba(15, 43, 72, 0.08)',
            'card-hover': '0 20px 35px -4px rgba(15, 43, 72, 0.14)',
          }
        }
      }
    }
  </script>

  <!-- Pretendard Font -->
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />

  <style>
    html {
      font-size: 17px;
    }
    @media (min-width: 640px) {
      html {
        font-size: 17.5px;
      }
    }
    @media (min-width: 1024px) {
      html {
        font-size: 18px;
      }
    }
    body { font-family: 'Pretendard', sans-serif; word-break: keep-all; line-height: 1.65; }
    .glass-header { background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(16px); }
    @keyframes float-gentle { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    .animate-float { animation: float-gentle 4s ease-in-out infinite; }
    /* Extra readability tweaks */
    p, span, li, button, input, textarea, select {
      letter-spacing: -0.015em;
    }
  </style>
</head>
<body class="bg-white text-slate-800 antialiased selection:bg-brand-ice selection:text-white flex flex-col min-h-screen">

  <!-- NAVIGATION BAR -->
  <header id="navbar" class="fixed top-0 inset-x-0 z-50 transition-all duration-300 glass-header border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
      
            <!-- Brand Logo -->
      <a href="index.html" class="flex items-center gap-2.5 sm:gap-3 group">
        <img src="images/logo.png" alt="AirLab 로고" class="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform duration-200" />
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5">
            <span class="text-xl sm:text-2xl font-black tracking-tight text-brand-navy leading-none">AirLab</span>
            <span class="text-sm font-bold text-brand-ice leading-none">에어랩</span>
          </div>
          <span class="text-[11px] font-semibold tracking-wider text-slate-400 mt-0.5 uppercase">프리미엄 에어컨 케어</span>
        </div>
      </a>

      <!-- Center: Main Navigation Links -->
      <nav class="hidden md:flex items-center gap-7 text-base font-semibold text-slate-700">
        <a href="index.html" class="hover:text-brand-navy transition-colors py-2">홈</a>
        <a href="about.html" class="hover:text-brand-navy transition-colors py-2">회사 소개</a>
        <a href="service.html" class="hover:text-brand-navy transition-colors py-2">서비스 단가</a>
        <a href="work.html" class="text-brand-navy font-bold border-b-2 border-brand-navy py-2">작업 현황</a>
        <a href="faq.html" class="hover:text-brand-navy transition-colors py-2">FAQ</a>
        <a href="contact.html" class="hover:text-brand-navy transition-colors py-2">견적 문의</a>
      </nav>

      <!-- Right CTA Button -->
      <div class="hidden md:flex items-center gap-4">
        <a href="contact.html" class="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-white bg-brand-navy hover:bg-brand-navyLight active:scale-95 transition-all shadow-soft hover:shadow-card">
          온라인 견적 신청
          <svg class="w-4 h-4 ml-1.5 text-brand-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <button id="mobileMenuBtn" type="button" class="md:hidden p-2.5 rounded-2xl text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition-colors" aria-label="메뉴 열기">
        <svg id="menuOpenIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <svg id="menuCloseIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobileMenu" class="md:hidden hidden border-b border-slate-100 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl">
      <div class="flex flex-col space-y-3 text-base font-medium text-slate-700">
        <a href="index.html" class="py-2 border-b border-slate-100">홈</a>
        <a href="about.html" class="py-2 border-b border-slate-100">회사 소개</a>
        <a href="service.html" class="py-2 border-b border-slate-100">서비스 단가</a>
        <a href="work.html" class="py-2 border-b border-slate-100 font-bold text-brand-navy">작업 현황</a>
        <a href="faq.html" class="py-2 border-b border-slate-100">FAQ</a>
        <a href="contact.html" class="py-2 border-b border-slate-100">견적 문의</a>
      </div>
      <div class="pt-2">
        <a href="contact.html" class="block w-full text-center py-3.5 px-4 rounded-2xl text-sm font-bold text-white bg-brand-navy shadow-md">
          온라인 견적 신청하기
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main class="flex-grow pt-28 pb-20">
    
    <!-- Hero Header -->
    <section class="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
      <div class="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-5">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-iceSoft border border-brand-ice/20 text-brand-navy text-sm font-bold uppercase tracking-wider">
          AirLab Field Portfolio
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.2]">
          실제 시공 현장 포트폴리오<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-ice">
            기업 · 관공서 · 시설별 맞춤 정밀 세척 현황
          </span>
        </h1>
        <p class="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed pt-2">
          에어랩 마스터 엔지니어 팀이 직접 시공한 기업 사옥, 공공기관, 대형 상업시설 및 프리미엄 주거 현장의 실제 작업 내역과 공정 포트폴리오입니다.
        </p>
      </div>
    </section>

    <!-- Key Stats / Capability Highlights -->
    <section class="py-8 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="p-5 rounded-2xl bg-brand-slateBg border border-slate-200/80 text-center">
            <span class="block text-2xl sm:text-3xl font-extrabold text-brand-navy">5,000+</span>
            <span class="text-sm text-slate-600 font-semibold mt-1 block">누적 에어컨 세척 대수</span>
          </div>
          <div class="p-5 rounded-2xl bg-brand-slateBg border border-slate-200/80 text-center">
            <span class="block text-2xl sm:text-3xl font-extrabold text-brand-navy">120+</span>
            <span class="text-sm text-slate-600 font-semibold mt-1 block">기업·공공기관 정기 파트너</span>
          </div>
          <div class="p-5 rounded-2xl bg-brand-slateBg border border-slate-200/80 text-center">
            <span class="block text-2xl sm:text-3xl font-extrabold text-brand-ice">3억원</span>
            <span class="text-sm text-slate-600 font-semibold mt-1 block">영업배상책임보험 가입</span>
          </div>
          <div class="p-5 rounded-2xl bg-brand-slateBg border border-slate-200/80 text-center">
            <span class="block text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</span>
            <span class="text-sm text-slate-600 font-semibold mt-1 block">공정 보고서 & 세금계산서 납품</span>
          </div>
        </div>
      </div>
    </section>

    <!-- REAL BEFORE & AFTER COMPARISON SECTION -->
    <section class="py-16 bg-white border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy text-white text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <span class="w-2 h-2 rounded-full bg-brand-ice animate-pulse"></span>
            AirLab Precision Proof
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            부위별 정밀 세척 Before & After
          </h2>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
            보이지 않는 냉각핀 깊숙한 찌든 때부터 악취의 주원인인 드레인판 곰팡이까지, 완전 분해와 친환경 약품 고압 세척으로 신품급 청결도를 복원합니다.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- Compare Card 1: 핀 (열교환기 / 에바) -->
          <div class="rounded-3xl bg-brand-slateBg border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm">01</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-extrabold text-brand-navy">천장형 에어컨 냉각핀 (열교환기)</h3>
                  <p class="text-xs sm:text-sm text-slate-500">먼지·곰팡이 찌든 때 ➔ 알루미늄 본연의 은빛 광택 복원</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">냉방효율 20%↑</span>
            </div>

            <!-- Side by Side Photos -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <!-- Before -->
              <div class="space-y-2">
                <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group">
                  <img src="images/compare_fin_before.jpg" alt="냉각핀 세척 전 곰팡이 오염" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-rose-600/90 text-white font-black text-xs shadow-md">BEFORE (세척 전)</span>
                </div>
                <p class="text-xs text-slate-500 font-medium text-center">알루미늄 핀 사이 곰팡이·먼지 흡착</p>
              </div>

              <!-- After -->
              <div class="space-y-2">
                <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border-2 border-brand-ice shadow-md group">
                  <img src="images/compare_fin_after.jpg" alt="냉각핀 친환경 고압 세척 후" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white font-black text-xs shadow-md">AFTER (세척 후)</span>
                </div>
                <p class="text-xs text-brand-navy font-bold text-center">에바브라이트 + 고압 세척 100% 관통</p>
              </div>
            </div>
          </div>

          <!-- Compare Card 2: 드레인판(물받이) 및 송풍팬 -->
          <div class="rounded-3xl bg-brand-slateBg border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm">02</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-extrabold text-brand-navy">드레인판(물받이) & 송풍팬 부품</h3>
                  <p class="text-xs sm:text-sm text-slate-500">결로 썩은 냄새 및 곰팡이 슬러지 ➔ 100% 멸균 살균 세척</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-sky-100 text-brand-navy font-bold text-xs">악취 원인 100% 박멸</span>
            </div>

            <!-- Side by Side Photos -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <!-- Before -->
              <div class="space-y-2">
                <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group">
                  <img src="images/compare_part_before.jpg" alt="드레인판 및 송풍팬 세척 전 오염" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-rose-600/90 text-white font-black text-xs shadow-md">BEFORE (세척 전)</span>
                </div>
                <p class="text-xs text-slate-500 font-medium text-center">드레인판 물때 슬러지 & 쉰내 유발</p>
              </div>

              <!-- After -->
              <div class="space-y-2">
                <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border-2 border-brand-ice shadow-md group">
                  <img src="images/compare_part_after.jpg" alt="드레인판 및 송풍팬 분해 고압 세척 후" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white font-black text-xs shadow-md">AFTER (세척 후)</span>
                </div>
                <p class="text-xs text-brand-navy font-bold text-center">완전 분해 살균 세척으로 백색 광택 복원</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
    <!-- Work Cases Grid with Clean Pagination & Admin Mode -->
    <section class="py-16 bg-brand-slateBg relative" id="portfolioSection">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">

        <!-- Admin Active Control Banner -->
        <div id="adminBar" class="hidden p-4 sm:p-5 rounded-2xl bg-brand-navy text-white shadow-xl border border-brand-ice/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <p class="font-extrabold text-sm sm:text-base text-white">관리자(대표님) 시공사례 관리 모드</p>
              <p class="text-xs text-slate-300">새로운 시공 현장을 등록하거나 기존 사례를 수정/삭제할 수 있습니다.</p>
            </div>
          </div>
          <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button type="button" onclick="openCaseEditor()" class="px-5 py-2.5 rounded-xl bg-brand-ice hover:bg-brand-iceHover text-brand-navy font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
              새 시공사례 등록
            </button>
            <button type="button" onclick="logoutAdmin()" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all">
              로그아웃
            </button>
          </div>
        </div>

        <!-- Section Top Info Bar (Total Count & Admin Button) -->
        <div class="flex items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div class="flex items-center gap-2">
            <span class="text-base sm:text-lg font-extrabold text-brand-navy">전체 시공 사례</span>
            <span class="px-2.5 py-0.5 rounded-full bg-brand-navy text-white text-xs font-bold font-mono" id="totalCountBadge">0</span>
          </div>

          <!-- Admin Mode Hidden from Normal Public View -->
          <div class="hidden">
            <button id="adminLoginBtn" type="button" onclick="openAdminLoginModal()" class="hidden"></button>
          </div>
        </div>

        <!-- Dynamic Portfolio Cards Grid Container -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-7" id="galleryContainer">
          <!-- Rendered via JavaScript -->
        </div>

        <!-- Pagination UI Container -->
        <div class="pt-8 flex items-center justify-center gap-1.5 sm:gap-2" id="paginationContainer">
          <!-- Rendered via JavaScript -->
        </div>

      </div>
    </section>

    <!-- 1. DETAIL MODAL (초깔끔 다중 사진 갤러리 & 상세 뷰) -->
    <div id="caseDetailModal" class="fixed inset-0 z-50 hidden overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300">
      <div class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[92vh]">
        
        <!-- Header -->
        <div class="p-5 sm:p-6 bg-brand-navy text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-xs text-slate-300">
              <span id="modalLocation" class="font-medium text-brand-ice">시공 위치</span>
              <span>•</span>
              <span id="modalDate" class="font-bold text-white">시공 일자</span>
            </div>
            <h2 id="modalTitle" class="text-lg sm:text-xl font-extrabold text-white leading-snug">
              시공 사례 제목
            </h2>
          </div>
          <button type="button" onclick="closeDetailModal()" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all ml-4 shrink-0" aria-label="닫기">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Scrollable Modal Content -->
        <div class="p-5 sm:p-8 overflow-y-auto space-y-6 flex-grow">
          
          <!-- Multi-Photo Gallery Viewer -->
          <div class="space-y-3 bg-slate-950 rounded-2xl p-3 sm:p-4 text-white">
            <div class="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
              <img id="modalMainImage" src="" alt="시공 현장 상세 사진" class="w-full h-full object-contain" />
              
              <!-- Prev / Next Arrow Buttons -->
              <button id="btnPrevPhoto" type="button" onclick="changeModalPhoto(-1)" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all" aria-label="이전 사진">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button id="btnNextPhoto" type="button" onclick="changeModalPhoto(1)" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all" aria-label="다음 사진">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
              </button>

              <!-- Photo Counter Badge -->
              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono font-bold text-white">
                <span id="photoIndexNum">1</span> / <span id="photoTotalNum">1</span>
              </div>
            </div>

            <!-- Thumbnail Strip -->
            <div id="modalThumbStrip" class="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-thin">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- Clean Single Spec Pill -->
          <div id="modalScaleBox" class="p-4 rounded-2xl bg-brand-slateBg border border-slate-200/80 flex items-center gap-2 text-sm sm:text-base">
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-navy text-white">시공 규모</span>
            <span id="modalScale" class="font-bold text-brand-navy">시스템 4Way 46대 + 매립덕트 12대</span>
          </div>

          

        </div>

      </div>
    </div>

    <!-- 2. ADMIN LOGIN MODAL -->
    <div id="adminLoginModal" class="fixed inset-0 z-50 hidden bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-brand-navy text-brand-ice mx-auto flex items-center justify-center font-bold">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 class="text-lg font-extrabold text-brand-navy">대표님 관리자 로그인</h3>
          <p class="text-xs text-slate-500">시공 사례 등록 및 관리를 위해 비밀번호를 입력해 주세요.</p>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">관리자 비밀번호</label>
            <input type="password" id="adminPasswordInput" placeholder="관리자 비밀번호를 입력하세요" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy" onkeydown="if(event.key==='Enter') verifyAdminPassword()" />
          </div>
          <p id="adminLoginError" class="text-xs text-rose-600 font-bold hidden text-center">비밀번호가 일치하지 않습니다.</p>
        </div>

        <div class="flex gap-2">
          <button type="button" onclick="closeAdminLoginModal()" class="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all">
            취소
          </button>
          <button type="button" onclick="verifyAdminPassword()" class="w-1/2 py-3 rounded-xl bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-sm shadow-md transition-all">
            로그인
          </button>
        </div>
      </div>
    </div>

    <!-- 3. POST / EDIT MODAL (필요한 것만 있는 초깔끔 폼) -->
    <div id="caseEditorModal" class="fixed inset-0 z-50 hidden overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[92vh]">
        
        <div class="p-5 sm:p-6 bg-brand-navy text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <h3 id="editorModalTitle" class="text-lg font-extrabold">새 시공사례 등록</h3>
          <button type="button" onclick="closeCaseEditor()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form id="caseForm" onsubmit="handleCaseSubmit(event)" class="p-5 sm:p-7 overflow-y-auto space-y-5 flex-grow">
          <input type="hidden" id="editCaseId" value="" />

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">시공 사례 제목 *</label>
            <input type="text" id="caseTitle" required placeholder="예: 판교 IT 테크타워 사옥 4Way 32대 및 실외기 정밀 케어" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-navy font-bold" />
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">시공 위치 *</label>
              <input type="text" id="caseLocation" required placeholder="예: 서울 강남구 도곡동 메디컬센터" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-navy" />
            </div>
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">시공 일자 *</label>
              <input type="text" id="caseDate" required placeholder="예: 2026.05 시공" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-navy" />
            </div>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">시공 규모 (선택)</label>
            <input type="text" id="caseScale" placeholder="예: 시스템 4Way 12대 + 스탠드 2대" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-navy" />
          </div>

          

          <!-- Multi-Photo Upload Area -->
          <div class="space-y-2 pt-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-slate-700">현장 사진 등록 * (여러 장 선택 가능)</label>
              <span class="text-xs text-slate-400">PNG, JPG 지원</span>
            </div>

            <!-- Upload Input Button -->
            <div class="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-brand-navy bg-slate-50 text-center cursor-pointer transition-colors relative">
              <input type="file" id="photoFileInput" multiple accept="image/*" onchange="handleMultiplePhotos(event)" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              <div class="space-y-2 pointer-events-none">
                <svg class="w-8 h-8 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <p class="text-sm font-bold text-brand-navy">사진 파일들을 클릭하여 선택하세요</p>
                <p class="text-xs text-slate-500">스마트폰 앨범 또는 PC에서 여러 장을 한 번에 선택할 수 있습니다.</p>
              </div>
            </div>

            <!-- Photo Preview Strip -->
            <div id="editorPhotoList" class="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
              <!-- Rendered preview thumbnails -->
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button type="button" onclick="closeCaseEditor()" class="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all">
              취소
            </button>
            <button type="submit" class="px-7 py-3 rounded-xl bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-sm shadow-md transition-all">
              저장 및 게시하기
            </button>
          </div>

        </form>

      </div>
    </div>


    <!-- B2B / 기관 고객 맞춤 신뢰 보증 안내 섹션 -->
    <section class="py-16 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-sm font-bold px-3.5 py-1 rounded-full bg-brand-iceSoft text-brand-navy uppercase tracking-wider">
            Corporate & Government Compliance
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            기업 및 관공서를 위한 4대 행정 지원 체계
          </h2>
          <p class="text-slate-600 text-sm">
            에어랩은 계약부터 현장 시공, 사후 서류 정산까지 담당자의 업무 부담이 없도록 철저한 행정 프로토콜을 준수합니다.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-3xl bg-brand-slateBg border border-slate-200/80 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-sm">01</div>
            <h3 class="font-bold text-brand-navy text-base">전자세금계산서 발행</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              부가세 포함 투명한 정찰제 단가로 전자세금계산서 및 사업자 거래 증빙을 신속하게 발행합니다.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-brand-slateBg border border-slate-200/80 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-sm">02</div>
            <h3 class="font-bold text-brand-navy text-base">시공 전/후 상세 보고서</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              기기별 일련번호, 분해 세척 전/후 사진 및 작업 내역이 포함된 공식 PDF 보고서를 납품합니다.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-brand-slateBg border border-slate-200/80 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-sm">03</div>
            <h3 class="font-bold text-brand-navy text-base">친환경 약품 성적서 완비</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              미국 EPA 인증 및 환경부 인체 무해 공인 시험성적서(MSDS)를 구비하여 시설물 안전을 보증합니다.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-brand-slateBg border border-slate-200/80 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-sm">04</div>
            <h3 class="font-bold text-brand-navy text-base">주말 상시 시공 & 야간·공휴일 맞춤 조율</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              업무 공백을 최소화하기 위해 주말 시공을 상시 지원하며, 야간 및 공휴일 시공은 사전 일정 상담을 통해 전담 엔지니어 팀을 투입합니다.
            </p>
          </div>
        </div>

                <!-- B2B 견적 박스 (비대면 사진 및 기종 정보 기반 신속 견적) -->
        <div class="p-8 sm:p-10 rounded-3xl bg-brand-navy text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card">
          <div class="space-y-2 max-w-2xl">
            <span class="text-sm font-bold px-3 py-1 rounded-full bg-white/20 text-brand-ice">B2B & 관공서 대량 견적</span>
            <h3 class="text-2xl font-extrabold text-white">사진 및 기종 정보 기반 빠른 맞춤 견적서 발송</h3>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              에어컨 기종과 대수, 현장 사진만 남겨주시면 대량 시공(5대 이상) 및 정기 유지보수 견적서를 신속하고 정확하게 발행해 드립니다.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="contact.html" class="px-6 py-3.5 rounded-2xl bg-brand-ice hover:bg-brand-iceHover text-brand-navy font-bold text-sm transition-colors text-center">
              대량 시공 견적 문의 →
            </a>
            <a href="tel:010-0000-0000" class="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors text-center">
              담당자 전화 상담
            </a>
          </div>
        </div>

      </div>
    </section>

  </main>
  <!-- FLOATING QUICK DOCK (AirLab 프리미엄 슬림 플로팅 캡슐) -->
  <aside class="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center select-none" aria-label="빠른 상담 독">
    
    <div class="w-[62px] sm:w-[66px] rounded-[36px] bg-brand-navy/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(15,43,72,0.3)] py-3.5 px-1.5 flex flex-col items-center gap-3 text-white transition-all">
      
      <!-- 1. 1분 견적 (메인 시그니처 뱃지) -->
      <a href="contact.html" class="group relative flex flex-col items-center transition-transform active:scale-95" aria-label="실시간 맞춤 견적 문의">
        <!-- Hover Left Tooltip -->
        <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none z-50">
          <div class="px-3 py-1.5 rounded-xl bg-brand-navy text-white text-sm font-bold whitespace-nowrap shadow-xl border border-slate-700/80 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-brand-ice animate-pulse"></span>
            실시간 맞춤 견적 문의
          </div>
        </div>
        
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-ice to-cyan-300 text-brand-navy flex items-center justify-center shadow-[0_0_18px_rgba(0,180,216,0.45)] group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <span class="text-[9px] font-extrabold text-brand-ice tracking-tighter mt-1">맞춤견적</span>
      </a>

            <!-- 2. 카카오톡 상담 -->
      <a href="#" onclick="alert('에어랩 카카오톡 1:1 상담 채널로 연결됩니다.'); return false;" class="group relative flex flex-col items-center transition-transform active:scale-95" aria-label="카카오톡 1:1 상담">
        <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none z-50">
          <div class="px-3 py-1.5 rounded-xl bg-brand-navy text-white text-sm font-bold whitespace-nowrap shadow-xl border border-slate-700/80">
            카카오톡 1:1 실시간 상담
          </div>
        </div>

        <div class="w-10 h-10 rounded-full bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.708 4.8 4.27 6.054l-.865 3.208c-.078.29.24.526.495.368l3.864-2.4c.404.053.818.085 1.236.085 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg>
        </div>
        <span class="text-[9px] font-medium text-slate-300 tracking-tighter mt-1">카카오톡</span>
      </a>

      <!-- 3. 공식 블로그 -->
      <a href="#" onclick="alert('에어랩 공식 네이버 블로그로 이동합니다.'); return false;" class="group relative flex flex-col items-center transition-transform active:scale-95" aria-label="공식 블로그">
        <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none z-50">
          <div class="px-3 py-1.5 rounded-xl bg-brand-navy text-white text-sm font-bold whitespace-nowrap shadow-xl border border-slate-700/80">
            에어랩 공식 블로그
          </div>
        </div>

        <div class="w-10 h-10 rounded-full bg-[#03C75A] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform font-black text-xs tracking-tighter">
          blog
        </div>
        <span class="text-[9px] font-medium text-slate-300 tracking-tighter mt-1">블로그</span>
      </a>

      <!-- 4. 전화 상담 -->
      <a href="tel:010-0000-0000" class="group relative flex flex-col items-center transition-transform active:scale-95" aria-label="전화 상담">
        <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none z-50">
          <div class="px-3 py-1.5 rounded-xl bg-brand-navy text-white text-sm font-bold whitespace-nowrap shadow-xl border border-slate-700/80">
            전화 상담 (1588-0000)
          </div>
        </div>

        <div class="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center border border-white/15 group-hover:scale-110 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
        </div>
        <span class="text-[9px] font-medium text-slate-300 tracking-tighter mt-1">전화상담</span>
      </a>

      <div class="w-5 border-b border-white/15 my-0.5"></div>

      <!-- 5. 맨 위로 (Top) -->
      <button type="button" onclick="window.scrollTo({top:0, behavior:'smooth'})" class="group relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-90" aria-label="맨 위로 이동" title="맨 위로">
        <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center pointer-events-none z-50">
          <div class="px-2.5 py-1 rounded-lg bg-brand-navy text-white text-xs sm:text-sm font-semibold whitespace-nowrap shadow-md border border-slate-700/80">
            맨 위로
          </div>
        </div>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button>

    </div>

  </aside>

  <!-- FOOTER -->
  <footer class="bg-brand-navy text-slate-400 py-16 border-t border-slate-800 text-sm mt-auto">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
                <div class="flex items-center gap-3">
          <img src="images/logo.png" alt="AirLab 로고" class="w-10 h-10 object-contain brightness-110" />
          <div>
            <span class="text-lg font-extrabold tracking-tight text-white">AirLab</span>
            <span class="text-sm text-slate-400 ml-2 font-medium">프리미엄 에어컨 분해 세척 에어랩</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-6 text-sm text-slate-400 font-medium">
          <a href="index.html" class="hover:text-white transition-colors">홈</a>
          <a href="about.html" class="hover:text-white transition-colors">회사 소개</a>
          <a href="service.html" class="hover:text-white transition-colors">서비스 단가</a>
          <a href="work.html" class="hover:text-white transition-colors">작업 현황</a>
          <a href="faq.html" class="hover:text-white transition-colors">FAQ</a>
          <a href="contact.html" class="hover:text-white transition-colors">견적 문의</a>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-8 text-xs leading-relaxed">
        <div class="space-y-1.5">
          <p class="text-slate-300 font-semibold">상호명: 에어랩 (AirLab) | 대표: 에어랩 마스터 엔지니어링팀</p>
          <p>대표번호: <span class="text-slate-300 font-medium">1588-0000 / 010-0000-0000</span> | 이메일: <span class="text-slate-300 font-medium">contact@airlab.kr</span></p>
          <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제2026-서울강남-00000호</p>
          <p>주소: 서울특별시 강남구 테헤란로 152 에어랩 테크센터 8층</p>
        </div>
        <div class="md:text-right space-y-2">
          <p class="text-slate-400">운영시간: 평일·주말 09:00 - 19:00 (공휴일 및 야간 시공은 사전 상담 후 조율 가능)</p>
          <p class="text-slate-500"><span ondblclick="openAdminLoginModal()" class="cursor-default select-none" title="">Copyright © 2026 에어랩 (AirLab). All rights reserved.</span></p>
        </div>
      </div>
    </div>
  </footer>
          <!-- JAVASCRIPT: Pure Photo & Spec Portfolio Engine -->
  <script>
    // 1. Initial Default Portfolio Data (Pure Photos & Minimal Meta)
    const DEFAULT_PORTFOLIO = [
      {
        id: "case-1",
        title: "[상가 매장] 대형 영업용 스탠드 에어컨 에바 뒷면 찌든 슬러지 정밀 관통 세척",
        location: "서울 강남구 상업시설 매장",
        date: "2026.04 시공",
        scale: "대형 영업용 스탠드 (냉각핀 앞뒤 양면 관통)",
        photos: [
          "images/stand_eva_back_dirty.jpg",
          "images/stand_eva_back_clean.jpg",
          "images/stand_eva_front.jpg",
          "images/stand_eva_clean_full.jpg"
        ]
      },
      {
        id: "case-2",
        title: "[아파트·오피스텔] 천장형 1WAY 완전 분해 & 마루바닥 방수 보양 세척",
        location: "서울 송파구 신축 아파트 주거공간",
        date: "2026.04 시공",
        scale: "천장형 1Way 3대 (바닥 방수 매트 및 집수 보양)",
        photos: [
          "images/home_1way_setup1.jpg",
          "images/home_1way_setup2.jpg",
          "images/compare_part_after.jpg",
          "images/compare_fin_after.jpg"
        ]
      },
      {
        id: "case-3",
        title: "소아청소년과 & 이비인후과 1Way/4Way 18대 무독성 살균",
        location: "서울 강남구 도곡동 메디컬센터",
        date: "2026.04 시공",
        scale: "1Way 12대 + 4Way 6대",
        photos: [
          "images/equip_evap.jpg",
          "images/compare_fin_after.jpg",
          "images/equip_shroud.jpg"
        ]
      },
      {
        id: "case-4",
        title: "홍대 3층 대형 베이커리 플래그십 360 원형 & 스탠드 탈지 케어",
        location: "서울 마포구 서교동",
        date: "2026.05 시공",
        scale: "360 원형 8대 + 영업용 38평 스탠드 2대",
        photos: [
          "images/compare_part_before.jpg",
          "images/compare_part_after.jpg",
          "images/hero_wash_bg.jpg"
        ]
      },
      {
        id: "case-5",
        title: "한남동 고급 펜트하우스 1Way 7대 프리미엄 전층 케어",
        location: "서울 용산구 한남동",
        date: "2026.04 시공",
        scale: "천장형 1Way 7대",
        photos: [
          "images/compare_fin_before.jpg",
          "images/compare_fin_after.jpg",
          "images/hero_ambient.jpg"
        ]
      },
      {
        id: "case-6",
        title: "대형 피트니스 & 필라테스 센터 4Way 14대 땀냄새·곰팡이 멸균",
        location: "서울 서초구 반포동",
        date: "2026.05 시공",
        scale: "천장형 4Way 14대 + 샤워실 환기라인",
        photos: [
          "images/equip_shroud.jpg",
          "images/compare_part_after.jpg",
          "images/equip_evap.jpg"
        ]
      }
    ];

    // 2. Data Management (LocalStorage)
    function getPortfolioData() {
      const stored = localStorage.getItem('airlab_portfolio_cases');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch(e) {
          console.error(e);
        }
      }
      localStorage.setItem('airlab_portfolio_cases', JSON.stringify(DEFAULT_PORTFOLIO));
      return DEFAULT_PORTFOLIO;
    }

    function savePortfolioData(data) {
      localStorage.setItem('airlab_portfolio_cases', JSON.stringify(data));
      renderPortfolio();
    }

    // 3. Admin Security & Irreversible SHA-256 Authentication
    const ADMIN_HASH = 'a1017cbe5bb576d1df820c68373a4013371a22f6c62ca410e4b1df295163d037';

    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    

    // Secret Keybind: Ctrl + Shift + A to open Admin Login
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdminLoginModal();
      }
    });

    function isAdmin() {
      return sessionStorage.getItem('airlab_admin_logged') === 'true';
    }

    function updateAdminUI() {
      const bar = document.getElementById('adminBar');
      const btn = document.getElementById('adminLoginBtn');
      if (isAdmin()) {
        if (bar) bar.classList.remove('hidden');
        if (btn) btn.classList.add('hidden');
      } else {
        if (bar) bar.classList.add('hidden');
        if (btn) btn.classList.remove('hidden');
      }
    }

    function openAdminLoginModal() {
      document.getElementById('adminPasswordInput').value = '';
      document.getElementById('adminLoginError').classList.add('hidden');
      document.getElementById('adminLoginModal').classList.remove('hidden');
      setTimeout(() => document.getElementById('adminPasswordInput').focus(), 100);
    }

    function closeAdminLoginModal() {
      document.getElementById('adminLoginModal').classList.add('hidden');
    }

    async function verifyAdminPassword() {
      const pw = document.getElementById('adminPasswordInput').value;
      const inputHash = await sha256(pw);
      if (inputHash === ADMIN_HASH) {
        sessionStorage.setItem('airlab_admin_logged', 'true');
        closeAdminLoginModal();
        updateAdminUI();
        renderPortfolio();
        alert('관리자 모드로 로그인되었습니다. 시공사례를 자유롭게 등록/수정/삭제하실 수 있습니다.');
      } else {
        document.getElementById('adminLoginError').classList.remove('hidden');
      }
    }

    function logoutAdmin() {
      sessionStorage.removeItem('airlab_admin_logged');
      updateAdminUI();
      renderPortfolio();
      alert('관리자 모드에서 로그아웃되었습니다.');
    }

    // 4. Pagination & Clean Rendering Engine
    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;

    function renderPortfolio() {
      const list = getPortfolioData();
      const container = document.getElementById('galleryContainer');
      const countBadge = document.getElementById('totalCountBadge');
      if (countBadge) countBadge.textContent = list.length;

      if (!container) return;

      if (list.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-16 text-center text-slate-400 space-y-3">
            <svg class="w-12 h-12 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <p class="text-base font-bold text-slate-600">등록된 시공 사례가 없습니다.</p>
          </div>
        `;
        renderPagination(0);
        return;
      }

      const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedItems = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      const adminLogged = isAdmin();

      container.innerHTML = paginatedItems.map(item => {
        const hasPhotos = item.photos && item.photos.length > 0;
        const coverPhoto = hasPhotos ? item.photos[0] : '';
        const photoCount = hasPhotos ? item.photos.length : 0;

        return `
          <div class="work-card rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-soft hover:shadow-card flex flex-col justify-between transition-all duration-300 group cursor-pointer" onclick="openCaseDetail('${item.id}')">
            
            <div>
              <!-- Photo Cover Area -->
              <div class="aspect-[16/10] bg-slate-900 relative overflow-hidden flex items-center justify-center">
                ${hasPhotos ? `
                  <img src="${coverPhoto}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ` : `
                  <div class="text-center p-4 text-slate-500 space-y-1">
                    <svg class="w-8 h-8 mx-auto opacity-40 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span class="text-xs font-semibold text-slate-400">등록된 사진 없음</span>
                  </div>
                `}

                <!-- Photo Count Pill (Bottom-Right) -->
                ${photoCount > 1 ? `
                  <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>사진 ${photoCount}장</span>
                  </div>
                ` : ''}

                <!-- Hover Overlay Hint -->
                <div class="absolute inset-0 bg-brand-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span class="px-4 py-2 rounded-full bg-white/95 text-brand-navy text-xs font-extrabold shadow-lg backdrop-blur-sm">
                    사진 & 상세 보기 🔍
                  </span>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6 space-y-3">
                <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span class="font-medium text-slate-500">${item.location}</span>
                  <span class="font-bold text-brand-navy">${item.date}</span>
                </div>
                <h3 class="text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-ice transition-colors">
                  ${item.title}
                </h3>

                ${item.scale ? `
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-slateBg border border-slate-200/80 text-xs font-bold text-brand-navy">
                    <span class="text-slate-400">규모:</span>
                    <span>${item.scale}</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Footer & Admin Action Buttons -->
            <div class="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span class="text-xs font-bold text-brand-ice group-hover:translate-x-1 transition-transform inline-flex items-center">
                사진 상세 보기 →
              </span>

              ${adminLogged ? `
                <div class="flex items-center gap-1.5" onclick="event.stopPropagation()">
                  <button type="button" onclick="editCase('${item.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-700 text-xs font-bold transition-all">
                    수정
                  </button>
                  <button type="button" onclick="deleteCase('${item.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 text-xs font-bold transition-all">
                    삭제
                  </button>
                </div>
              ` : ''}
            </div>

          </div>
        `;
      }).join('');

      renderPagination(totalPages);
    }

    // Render Pagination Controls
    function renderPagination(totalPages) {
      const pContainer = document.getElementById('paginationContainer');
      if (!pContainer) return;

      if (totalPages <= 1) {
        pContainer.innerHTML = '';
        return;
      }

      let html = '';

      if (currentPage > 1) {
        html += `
          <button type="button" onclick="goToPage(${currentPage - 1})" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-sm transition-all flex items-center gap-1">
            이전
          </button>
        `;
      }

      for (let p = 1; p <= totalPages; p++) {
        if (p === currentPage) {
          html += `
            <button type="button" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0070F3] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center transition-all">
              ${p}
            </button>
          `;
        } else {
          html += `
            <button type="button" onclick="goToPage(${p})" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-sm flex items-center justify-center transition-all">
              ${p}
            </button>
          `;
        }
      }

      if (currentPage < totalPages) {
        html += `
          <button type="button" onclick="goToPage(${currentPage + 1})" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-sm transition-all flex items-center gap-1">
            다음
          </button>
        `;
      }

      pContainer.innerHTML = html;
    }

    function goToPage(page) {
      currentPage = page;
      renderPortfolio();
      const section = document.getElementById('portfolioSection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // 5. Multi-Photo Detail Modal Logic
    let currentModalPhotos = [];
    let currentModalPhotoIdx = 0;

    function openCaseDetail(id) {
      const list = getPortfolioData();
      const item = list.find(c => c.id === id);
      if (!item) return;

      document.getElementById('modalLocation').textContent = item.location || '';
      document.getElementById('modalDate').textContent = item.date || '';
      document.getElementById('modalTitle').textContent = item.title || '';

      const scaleBox = document.getElementById('modalScaleBox');
      if (item.scale) {
        scaleBox.classList.remove('hidden');
        document.getElementById('modalScale').textContent = item.scale;
      } else {
        scaleBox.classList.add('hidden');
      }

      currentModalPhotos = (item.photos && item.photos.length > 0) ? item.photos : [];
      currentModalPhotoIdx = 0;
      updateModalPhoto();

      document.getElementById('caseDetailModal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function updateModalPhoto() {
      const total = currentModalPhotos.length;
      const mainImg = document.getElementById('modalMainImage');
      const btnPrev = document.getElementById('btnPrevPhoto');
      const btnNext = document.getElementById('btnNextPhoto');
      const strip = document.getElementById('modalThumbStrip');

      if (total === 0) {
        mainImg.src = '';
        document.getElementById('photoIndexNum').textContent = '0';
        document.getElementById('photoTotalNum').textContent = '0';
        btnPrev.classList.add('hidden');
        btnNext.classList.add('hidden');
        strip.innerHTML = '<p class="text-xs text-slate-400 py-2">등록된 사진이 없습니다.</p>';
        return;
      }

      if (currentModalPhotoIdx < 0) currentModalPhotoIdx = total - 1;
      if (currentModalPhotoIdx >= total) currentModalPhotoIdx = 0;

      mainImg.src = currentModalPhotos[currentModalPhotoIdx];
      document.getElementById('photoIndexNum').textContent = currentModalPhotoIdx + 1;
      document.getElementById('photoTotalNum').textContent = total;

      if (total <= 1) {
        btnPrev.classList.add('hidden');
        btnNext.classList.add('hidden');
      } else {
        btnPrev.classList.remove('hidden');
        btnNext.classList.remove('hidden');
      }

      strip.innerHTML = currentModalPhotos.map((p, idx) => `
        <button type="button" onclick="setModalPhotoIndex(${idx})" class="w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${idx === currentModalPhotoIdx ? 'border-brand-ice scale-105 shadow-md' : 'border-white/20 opacity-60 hover:opacity-100'}">
          <img src="${p}" alt="썸네일" class="w-full h-full object-cover" />
        </button>
      `).join('');
    }

    function setModalPhotoIndex(idx) {
      currentModalPhotoIdx = idx;
      updateModalPhoto();
    }

    function changeModalPhoto(delta) {
      currentModalPhotoIdx += delta;
      updateModalPhoto();
    }

    function closeDetailModal() {
      document.getElementById('caseDetailModal').classList.add('hidden');
      document.body.style.overflow = '';
    }

    // 6. Post / Edit Case Logic
    let uploadedPhotos = [];

    function openCaseEditor(editItem = null) {
      const modal = document.getElementById('caseEditorModal');
      const form = document.getElementById('caseForm');
      form.reset();

      if (editItem) {
        document.getElementById('editorModalTitle').textContent = '시공사례 수정';
        document.getElementById('editCaseId').value = editItem.id;
        document.getElementById('caseTitle').value = editItem.title;
        document.getElementById('caseLocation').value = editItem.location;
        document.getElementById('caseDate').value = editItem.date;
        document.getElementById('caseScale').value = editItem.scale || '';
        uploadedPhotos = editItem.photos ? [...editItem.photos] : [];
      } else {
        document.getElementById('editorModalTitle').textContent = '새 시공사례 등록';
        document.getElementById('editCaseId').value = '';
        uploadedPhotos = [];
      }

      renderEditorPhotoList();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeCaseEditor() {
      document.getElementById('caseEditorModal').classList.add('hidden');
      document.body.style.overflow = '';
    }

    function handleMultiplePhotos(e) {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            const scaleSize = Math.min(1, MAX_WIDTH / img.width);
            canvas.width = img.width * scaleSize;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            uploadedPhotos.push(compressed);
            renderEditorPhotoList();
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    function renderEditorPhotoList() {
      const list = document.getElementById('editorPhotoList');
      if (uploadedPhotos.length === 0) {
        list.innerHTML = '<p class="text-xs text-slate-400 col-span-full py-2">등록된 사진이 없습니다. 위에서 사진을 추가하세요.</p>';
        return;
      }

      list.innerHTML = uploadedPhotos.map((p, idx) => `
        <div class="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group">
          <img src="${p}" alt="업로드 사진" class="w-full h-full object-cover" />
          <button type="button" onclick="removeEditorPhoto(${idx})" class="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-md hover:bg-rose-700 transition-all">
            ✕
          </button>
          <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
            ${idx === 0 ? '대표' : idx + 1}
          </span>
        </div>
      `).join('');
    }

    function removeEditorPhoto(idx) {
      uploadedPhotos.splice(idx, 1);
      renderEditorPhotoList();
    }

    function handleCaseSubmit(e) {
      e.preventDefault();
      const list = getPortfolioData();
      const editId = document.getElementById('editCaseId').value;

      if (uploadedPhotos.length === 0) {
        alert('현장 사진을 최소 1장 이상 등록해 주세요.');
        return;
      }

      const caseData = {
        id: editId || 'case-' + Date.now(),
        title: document.getElementById('caseTitle').value,
        location: document.getElementById('caseLocation').value,
        date: document.getElementById('caseDate').value,
        scale: document.getElementById('caseScale').value,
        photos: [...uploadedPhotos]
      };

      if (editId) {
        const idx = list.findIndex(c => c.id === editId);
        if (idx !== -1) list[idx] = caseData;
      } else {
        list.unshift(caseData);
        currentPage = 1;
      }

      savePortfolioData(list);
      closeCaseEditor();
      alert(editId ? '시공사례가 성공적으로 수정되었습니다!' : '새 시공사례가 성공적으로 등록되었습니다!');
    }

    function editCase(id) {
      const list = getPortfolioData();
      const item = list.find(c => c.id === id);
      if (item) openCaseEditor(item);
    }

    function deleteCase(id) {
      if (!confirm('정말로 이 시공사례를 삭제하시겠습니까?')) return;
      let list = getPortfolioData();
      list = list.filter(c => c.id !== id);
      savePortfolioData(list);
      alert('시공사례가 삭제되었습니다.');
    }

    // Keyboard Escape Key Listener for Modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDetailModal();
        closeCaseEditor();
        closeAdminLoginModal();
      }
      if (e.key === 'ArrowLeft' && !document.getElementById('caseDetailModal').classList.contains('hidden')) {
        changeModalPhoto(-1);
      }
      if (e.key === 'ArrowRight' && !document.getElementById('caseDetailModal').classList.contains('hidden')) {
        changeModalPhoto(1);
      }
    });

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      // Clean old format cache if necessary
      const stored = localStorage.getItem('airlab_portfolio_cases');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.length > 0 && parsed[0].content !== undefined) {
            localStorage.removeItem('airlab_portfolio_cases'); // Refresh to clean format
          }
        } catch(e) {}
      }
      updateAdminUI();
      renderPortfolio();
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const openIco = document.getElementById('menuOpenIcon');
    const closeIco = document.getElementById('menuCloseIcon');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !isHidden);
        if (openIco) openIco.classList.toggle('hidden', isHidden);
        if (closeIco) closeIco.classList.toggle('hidden', !isHidden);
      });
    }