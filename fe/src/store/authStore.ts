import { create } from "zustand";

type User = {
  id: number;
  phone: string;
  name: string;
  company: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  initialized: boolean; // ⭐ 추가

  login: (data: {
    user: User;
    access: string;
    refresh: string;
  }) => void;

  logout: () => void;
  initialize: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  initialized: false, // ⭐ 기본 false

  login: ({ user, access, refresh }) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      accessToken: access,
      refreshToken: refresh,
      initialized: true,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      initialized: true,
    });
  },

  initialize: () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");

    if (access && refresh && user) {
      set({
        user: JSON.parse(user),
        accessToken: access,
        refreshToken: refresh,
        initialized: true,
      });
    } else {
      set({ initialized: true });
    }
  },
}));
