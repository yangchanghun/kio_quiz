import { create } from "zustand";

type User = {
  id: number;
  phone: string;
  name: string;
  company: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  initialized: boolean; // ⭐ 추가

  login: (data: { user: User; token: string }) => void;

  logout: () => void;
  initialize: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  initialized: false, // ⭐ 기본 false

  login: ({ user, token, refresh }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      token: token,
      initialized: true,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      user: null,
      token: null,
      initialized: true,
    });
  },

  initialize: () => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");

    if (token && refresh && user) {
      set({
        user: JSON.parse(user),
        token: token,
        initialized: true,
      });
    } else {
      set({ initialized: true });
    }
  },
}));
