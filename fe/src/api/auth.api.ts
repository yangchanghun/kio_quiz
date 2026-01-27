// src/api/auth.api.ts
import axios from "axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth";

// ✅ 공통 baseURL
// const BASE_URL = import.meta.env.PROD
//   ? "https://kioquiz.kioedu.co.kr/api"
//   : "http://localhost:8000/api";

const BASE_URL = "https://kioquiz.kioedu.co.kr/api";

// 🔹 회원가입
export const registerApi = async (payload: RegisterPayload) => {
  const res = await axios.post(`${BASE_URL}/accounts/register/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// 🔹 로그인
export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const res = await axios.post(`${BASE_URL}/accounts/login/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
