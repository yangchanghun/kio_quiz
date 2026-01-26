import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import { MainQuizListPage } from "./pages/Main/MainQuizListPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Background } from "./background/Background";
import { MainQuizDetailPage } from "./pages/Main/MainQuizDetailPage";
import AdminQuizUpdator from "./pages/AdminQuizUpdator";
import MemoryWordGame from "./miryangspecial/memoryquiz/MemoryWordGame";
import Alzheimer from "./miryangspecial/alzheimer/Alzheimer";
import AlzheimerResult from "./miryangspecial/alzheimer/AlzheimerResult";

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Routes>
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
        path="/quiz/result"
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
      <Route
        path="/miryang/memorytest"
        element={
          <ProtectedRoute>
            <MemoryWordGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/alzhemier"
        element={
          <ProtectedRoute>
            <Alzheimer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/alzhemier/result"
        element={
          <ProtectedRoute>
            <AlzheimerResult />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
