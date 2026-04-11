export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="container-narrow py-20">
      <div className="card p-8">
        <h1 className="text-2xl font-bold">관리자 로그인</h1>
        <p className="mt-1 text-sm text-ink-500">
          .env.local의 <code className="rounded bg-ink-100 px-1">ADMIN_PASSWORD</code>를 입력하세요.
        </p>
        <form action="/api/admin/login" method="post" className="mt-6 space-y-3">
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            required
            autoFocus
            className="w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
          {searchParams.error && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
              비밀번호가 올바르지 않습니다.
            </div>
          )}
          <button className="btn-primary w-full">로그인</button>
        </form>
      </div>
    </div>
  );
}
