// src/types/auth.ts
export interface RegisterPayload {
  phone: string;
  name: string;
  company?: string;
  password1: string;
  password2: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    phone: string;
    name: string;
    company: string;
  };
}
