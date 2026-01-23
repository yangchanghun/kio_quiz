import { useAuthStore } from "@/store/authStore";

export default function AdminHeader({
  onDashboardClick,
  onEditPage,
}: {
  status: string;
  onDashboardClick: () => void;
  onEditPage: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6">
      <div className="font-bold text-green-700">SMART KIO</div>

      <nav className="flex gap-2">
        <button
          onClick={onEditPage}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          퀴즈만들기
        </button>
        <button
          onClick={onDashboardClick}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          퀴즈관리
        </button>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">
          관리자
        </button>
      </nav>

      <div className="flex items-center gap-3">
        <span>{user?.name}</span>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">
          Logout
        </button>
      </div>
    </header>
  );
}
