// src/routes/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Background } from "@/background/Background";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import MainPage from "@/pages/MainPage";
import AdminPage from "@/pages/AdminPage";
import { MainQuizListPage } from "@/pages/Main/MainQuizListPage";
import { MainQuizDetailPage } from "@/pages/Main/MainQuizDetailPage";
import AdminQuizUpdator from "@/pages/AdminQuizUpdator";

import MiryangRoutes from "./miryangspecial/MiryangRoutes";

export default function AppRoutes() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Routes>
      {/* 기본 */}
      <Route
        path="/"
        element={
          <Background>
            <MainPage />
          </Background>
        }
      />

      <Route
        path="/quizlist"
        element={
          <ProtectedRoute>
            <Background>
              <MainQuizListPage />
            </Background>
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:quizId"
        element={
          <ProtectedRoute>
            <Background>
              <MainQuizDetailPage />
            </Background>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/management"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/management/update/:quizId"
        element={
          <ProtectedRoute>
            <AdminQuizUpdator />
          </ProtectedRoute>
        }
      />

      {/* ⭐ 밀양시청 라우트 */}
      <MiryangRoutes />
    </Routes>
  );
}
