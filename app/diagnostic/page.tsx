import DiagnosticClient from "./DiagnosticClient";

export const metadata = {
  title: "무료 온라인 진단",
  description:
    "3분이면 끝나는 펜션 온라인 상태 진단. 20개 항목 체크 후 맞춤 리포트를 SMS로 받으세요.",
};

export default function DiagnosticPage() {
  return (
    <div className="container-narrow py-10 sm:py-14">
      <div className="mb-6">
        <div className="label">STAGE 1 · 무료 진단</div>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          사장님 펜션의 온라인 상태, 3분이면 압니다.
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          광고대행사의 영업 전화가 아닙니다. 7년차 펜션 운영자가
          직접 설계한 20개 항목입니다. 체크 후 <b>맞춤 리포트</b>를 문자로
          보내드립니다.
        </p>
      </div>
      <DiagnosticClient />
    </div>
  );
}
