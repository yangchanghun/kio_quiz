// src/api/auth.api.ts
import api from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth";

export const registerApi = async (payload: RegisterPayload) => {
  const res = await api.post("/accounts/register/", payload);
  return res.data;
};

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post("/accounts/login/", payload);
  return res.data;
};
