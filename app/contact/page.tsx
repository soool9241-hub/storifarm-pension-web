import ContactClient from "./ContactClient";

export const metadata = {
  title: "상담 신청 — 스토리팜",
  description: "30분 무료 상담. 현황 진단 + 맞춤 Tier 추천 + 경쟁사 비교.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { tier?: string; lead?: string };
}) {
  return (
    <div className="container-narrow py-10 sm:py-14">
      <div className="label">무료 상담 신청</div>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
        30분 상담으로 사장님 펜션에 맞는 전략부터 짜드릴게요
      </h1>
      <p className="mt-3 text-sm text-ink-700">
        상담 후 제작 의뢰 여부는 천천히 판단하셔도 됩니다. 부담 없이 현황부터
        보여드리는 자리입니다.
      </p>
      <div className="mt-8">
        <ContactClient
          defaultTier={searchParams.tier as any}
          leadId={searchParams.lead}
        />
      </div>

      <div className="mt-10 rounded-2xl bg-ink-100/40 p-6 text-sm text-ink-700">
        <div className="font-semibold text-ink-900">바로 연락 주셔도 됩니다</div>
        <div className="mt-2">📞 010-8531-9531</div>
        <div>💬 카카오톡 sool9241</div>
        <div>📧 help@healingstay.com</div>
      </div>
    </div>
  );
}
