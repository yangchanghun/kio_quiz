import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);

  // ⏳ 아직 인증 상태 확인 중
  if (!initialized) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "40vh" }}>
        Loading...
      </div>
    );
  }

  // ❌ 로그인 안 됨
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
