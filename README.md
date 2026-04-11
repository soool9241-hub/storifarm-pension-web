# 스토리팜 · 펜션 홈페이지 제작 서비스 웹

7년차 펜션 운영자 **임솔(달팽이아지트)** 이 직접 설계한 펜션 홈페이지 제작 시스템의 공식 웹사이트입니다.
6단계 자동 매출 퍼널 (진단 → 리포트 → 제작 → 유지보수 → 아카데미 → 파트너)을 Next.js + Supabase + Solapi로 구현했습니다.

> 실제 운영 중인 펜션 사이트: https://dalpaengi-five.vercel.app

---

## 기술 스택

- **Next.js 14** (App Router, TypeScript, Tailwind)
- **Supabase** (Postgres + RLS + Admin API via Service Role)
- **Solapi** (SMS / 알림톡 발송)
- **Zod** (API 입력 검증)
- **Vercel** (배포)

## 폴더 구조

```
web/
├── app/
│   ├── page.tsx                  # 랜딩 (6단계 퍼널 시각화 + 카피)
│   ├── diagnostic/               # STAGE 1 — 무료 진단 20문항
│   ├── report/[slug]/            # STAGE 2 — 맞춤 리포트 (공개 슬러그)
│   ├── pricing/                  # STAGE 3 — 제작 요금 3 티어
│   ├── contact/                  # STAGE 3 — 상담 신청
│   ├── maintenance/              # STAGE 4 — 월 유지보수 구독
│   ├── academy/                  # STAGE 5 — 운영 아카데미 3 상품
│   ├── partners/                 # STAGE 6 — 파트너 라이선스 지원
│   ├── admin/                    # 관리자 대시보드 (리드 · 퍼널)
│   └── api/
│       ├── diagnostic/           # 진단 저장 + 리포트 생성 + SMS 발송
│       ├── consultation/         # 상담 신청 접수 + 관리자 알림
│       ├── maintenance/          # 유지보수 구독 문의
│       ├── enroll/               # 아카데미 수강 신청
│       ├── partner/              # 파트너 지원
│       └── admin/login|logout/
├── components/funnel/            # 6단계 퍼널 컴포넌트
├── lib/
│   ├── supabase/{client,server,admin}.ts
│   ├── solapi/client.ts
│   ├── scoring.ts                # 진단 점수/등급/우선순위 계산
│   └── types.ts
└── supabase/migrations/0001_init.sql
```

---

## 셋업

### 1. 의존성 설치

```bash
cd web
npm install
```

### 2. Supabase 프로젝트 생성 & SQL 실행

1. https://supabase.com/dashboard → New project
2. 프로젝트 생성 후 **SQL Editor** 열기
3. `supabase/migrations/0001_init.sql` 전체 내용을 붙여넣고 Run
4. 테이블 10개(`leads`, `diagnostics`, `reports`, `consultations`, `contracts`, `packages`, `maintenance_subscriptions`, `academy_enrollments`, `partner_applications`, `sms_logs`)가 생성되었는지 확인
5. `packages` 테이블에 3개 티어(light/standard/premium)가 시드되었는지 확인
6. **Settings → API**에서 아래 값 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ 절대 노출 금지)

### 3. Solapi 계정 설정

1. https://solapi.com 로그인
2. **My Page → API Key** 에서 API Key / API Secret 확인
3. 발신번호 사전 등록 → `SOLAPI_SENDER`에 입력 (예: `01085319531`)

> 💡 Solapi 키가 없어도 개발 가능: `lib/solapi/client.ts`가 자동으로 모킹 모드로 폴백하고 콘솔에 로그만 찍습니다.

### 4. 환경변수

`.env.example`을 복사해서 `.env.local`로 이름 변경 후 채우기:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

SOLAPI_API_KEY=NCSXXXXXXXXXXXXXXXX
SOLAPI_API_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SOLAPI_SENDER=01085319531

ADMIN_PHONE=01085319531
ADMIN_PASSWORD=원하는비밀번호

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BRAND_NAME=스토리팜
```

### 5. 로컬 실행

```bash
npm run dev
# http://localhost:3000
```

---

## 6단계 퍼널 동작 확인

| # | 페이지 | 테스트 시나리오 |
|---|--------|----------------|
| 1 | `/diagnostic` | 20문항 체크 → 성함/연락처 입력 → "리포트 받기" |
| 2 | `/report/{slug}` | 제출 후 자동 이동, SMS 문자 수신 (또는 콘솔 로그) |
| 3 | `/pricing` → `/contact` | 3티어 표시 → 상담 신청 폼 제출 |
| 4 | `/maintenance` | 3 플랜 표시 → 구독 문의 폼 |
| 5 | `/academy` | 온라인/원데이/아카데미 → 수강 신청 |
| 6 | `/partners` | 1인 1지역 독점 설명 → 파트너 지원 |

모든 제출은 `leads` 테이블에 저장되고, 해당 스테이지 테이블에 상세가 쌓이며, 관리자(ADMIN_PHONE)에게 Solapi 알림이 갑니다.

---

## 관리자 페이지

- `/admin` — 대시보드 (전체 지표 + 최근 리드 10건)
- `/admin/leads` — 리드 목록 200건
- `/admin/funnel` — 퍼널 단계별 전환율
- 로그인은 `ADMIN_PASSWORD`로 단순 인증 (운영 시 Supabase Auth로 교체 권장)

---

## 카피 컨셉 (⚠️ 수정 시 주의)

이 사이트의 모든 카피는 **"7년차 펜션 운영자 임솔이 직접 만든 시스템"** 관점으로 작성되어 있습니다.
- ❌ "저희 에이전시가 제작해드립니다"
- ✅ "제가 달팽이아지트에서 쓰는 시스템을 그대로 드립니다"

이 톤을 유지해야 광고대행사 대비 차별화가 유지됩니다.

---

## 배포 (Vercel)

```bash
vercel
# 또는 GitHub 연동 후 자동 배포
```

환경변수 6개를 Vercel Project Settings → Environment Variables에 동일하게 등록하세요.
`NEXT_PUBLIC_SITE_URL`은 실제 배포 도메인으로 교체 (리포트 SMS 링크에 사용됨).

---

## 남은 작업 (다음 스프린트)

- [ ] Stage 2 리포트 PDF 생성 (Claude API로 개인화 요약 추가)
- [ ] 제작 진행 현황 (contracts) 관리 화면
- [ ] Toss Payments 연동 (착수금 50%/잔금 50% 자동 결제)
- [ ] n8n 후속 시퀀스 (D+2 체크인 / D+5 사례 / D+10 최종 CTA)
- [ ] 파트너 전용 대시보드 (지역별 리드 분배)
- [ ] 멀티테넌시 (파트너별 브랜딩)

---

## 문의

**스토리팜 · 달팽이아지트**
임솔 대표 · 010-8531-9531 · sool9241 (카카오톡) · help@healingstay.com
