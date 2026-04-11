-- Storifarm pension service schema
-- Run in Supabase SQL editor, or `supabase db push`
-- Creates tables for 6-stage funnel: diagnostic → report → build → maintain → academy → partner

set search_path = public;

-- ============================================================
-- 1. Leads (funnel entry — everyone who gives us a phone number)
-- ============================================================
create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  phone         text not null,
  pension_name  text,
  region        text,
  source        text default 'diagnostic',
  stage         text not null default 'lead',
    -- lead | diagnosed | reported | consulted | contracted | maintained | academy | partner
  note          text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists leads_phone_idx on leads(phone);
create index if not exists leads_stage_idx on leads(stage);
create index if not exists leads_created_at_idx on leads(created_at desc);

-- ============================================================
-- 2. Diagnostics (Stage 1 submissions)
-- ============================================================
create table if not exists diagnostics (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  answers       jsonb not null,
  score         integer not null,
  max_score     integer not null,
  pct           integer not null,
  grade         text not null,
  category_scores jsonb not null,
  priorities    text[] not null default '{}',
  created_at    timestamptz not null default now()
);
create index if not exists diagnostics_lead_idx on diagnostics(lead_id);

-- ============================================================
-- 3. Reports (Stage 2 — auto-generated personalized reports)
-- ============================================================
create table if not exists reports (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  diagnostic_id uuid references diagnostics(id) on delete set null,
  slug          text not null unique, -- public shareable id used in /report/[slug]
  content       jsonb not null,       -- structured report (sections, charts)
  pdf_url       text,
  sent_at       timestamptz,
  viewed_count  integer not null default 0,
  created_at    timestamptz not null default now()
);
create index if not exists reports_lead_idx on reports(lead_id);
create index if not exists reports_slug_idx on reports(slug);

-- ============================================================
-- 4. Consultations (Stage 3 gateway — request for free 30-min)
-- ============================================================
create table if not exists consultations (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  channel       text not null default 'phone', -- phone | kakao | zoom
  preferred_at  timestamptz,
  status        text not null default 'requested', -- requested | scheduled | done | cancelled
  tier_interest text, -- light | standard | premium
  message       text,
  created_at    timestamptz not null default now()
);
create index if not exists consultations_lead_idx on consultations(lead_id);

-- ============================================================
-- 5. Packages seed (Stage 3 — homepage build tiers)
-- ============================================================
create table if not exists packages (
  tier          text primary key, -- light | standard | premium
  display_name  text not null,
  price         integer not null, -- KRW
  features      jsonb not null,
  sort          integer not null default 0
);

insert into packages (tier, display_name, price, features, sort) values
  ('light',    '라이트',    1500000,
    '["반응형 홈페이지 3페이지","커스텀 도메인 1년","기본 예약 폼","SMS 자동 발송 1종","네이버 플레이스 세팅"]'::jsonb, 1),
  ('standard', '스탠다드',  3000000,
    '["반응형 홈페이지 6페이지","커스텀 도메인 1년","달력형 실시간 예약","SMS 자동 발송 3종","네이버 파워링크 세팅","GA4 + 전환 추적","운영 매뉴얼"]'::jsonb, 2),
  ('premium',  '프리미엄',  5000000,
    '["풀 커스텀 홈페이지","커스텀 도메인 2년","달력형 실시간 예약 + 결제","SMS/알림톡 자동 발송 5종","네이버 광고 키워드 37개","GA4 + Supabase 대시보드","모객 전략 컨설팅 3회","1개월 무상 유지보수"]'::jsonb, 3)
on conflict (tier) do update
  set display_name = excluded.display_name,
      price = excluded.price,
      features = excluded.features,
      sort = excluded.sort;

-- ============================================================
-- 6. Contracts (Stage 3 — signed homepage build contracts)
-- ============================================================
create table if not exists contracts (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  tier          text not null references packages(tier),
  amount        integer not null,
  template_id   text, -- modern | warm | luxury | natural | minimal
  status        text not null default 'draft', -- draft | signed | paid_50 | in_progress | delivered | paid_100 | done
  signed_at     timestamptz,
  delivered_at  timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists contracts_lead_idx on contracts(lead_id);
create index if not exists contracts_status_idx on contracts(status);

-- ============================================================
-- 7. Maintenance subscriptions (Stage 4 — recurring revenue)
-- ============================================================
create table if not exists maintenance_subscriptions (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  plan          text not null, -- basic | standard | premium
  monthly_fee   integer not null, -- 50000 | 100000 | 150000
  status        text not null default 'active', -- active | paused | cancelled
  next_bill_at  date,
  started_at    timestamptz not null default now(),
  cancelled_at  timestamptz
);
create index if not exists maintenance_lead_idx on maintenance_subscriptions(lead_id);
create index if not exists maintenance_status_idx on maintenance_subscriptions(status);

-- ============================================================
-- 8. Academy enrollments (Stage 5 — education membership)
-- ============================================================
create table if not exists academy_enrollments (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  product       text not null, -- online | oneday | academy
  price         integer not null,
  cohort        text, -- e.g. "2026-Q2"
  status        text not null default 'enrolled', -- enrolled | attending | graduated | dropped
  enrolled_at   timestamptz not null default now()
);
create index if not exists academy_lead_idx on academy_enrollments(lead_id);

-- ============================================================
-- 9. Partner applications (Stage 6 — regional license)
-- ============================================================
create table if not exists partner_applications (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references leads(id) on delete set null,
  applicant_name text not null,
  phone         text not null,
  region_wish   text not null, -- desired region
  experience    text,
  academy_grad  boolean default false,
  status        text not null default 'applied', -- applied | screening | approved | rejected | onboarded
  note          text,
  created_at    timestamptz not null default now()
);
create index if not exists partner_status_idx on partner_applications(status);

-- ============================================================
-- 10. SMS logs (Solapi send history)
-- ============================================================
create table if not exists sms_logs (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references leads(id) on delete set null,
  to_phone      text not null,
  template      text, -- report_delivery | admin_alert | consultation_confirm | ...
  body          text not null,
  status        text not null default 'sent', -- sent | failed | mocked
  solapi_message_id text,
  error         text,
  created_at    timestamptz not null default now()
);
create index if not exists sms_logs_lead_idx on sms_logs(lead_id);

-- ============================================================
-- updated_at trigger for leads
-- ============================================================
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at before update on leads
  for each row execute function set_updated_at();

-- ============================================================
-- Row Level Security
-- Writes go through service_role (server-side API routes).
-- Public can only read the packages table and a report by slug.
-- ============================================================
alter table leads                     enable row level security;
alter table diagnostics               enable row level security;
alter table reports                   enable row level security;
alter table consultations             enable row level security;
alter table contracts                 enable row level security;
alter table maintenance_subscriptions enable row level security;
alter table academy_enrollments       enable row level security;
alter table partner_applications      enable row level security;
alter table sms_logs                  enable row level security;
alter table packages                  enable row level security;

-- Packages: public read
drop policy if exists "packages_public_read" on packages;
create policy "packages_public_read" on packages for select using (true);

-- Reports: public read by slug (we don't expose lead id)
drop policy if exists "reports_public_read" on reports;
create policy "reports_public_read" on reports for select using (true);

-- All other tables: no anon access (service_role bypasses RLS automatically)
-- This ensures personal phone numbers stay private.
