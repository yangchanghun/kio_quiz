// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/auth.api";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 🔐 토큰 저장 (일단 localStorage)
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
}
