import { create } from "zustand";
import { cookies } from "@/lib/cookies";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  removeToken: () => void;
}

const initToken = cookies.get("token") ?? null;

const useAuthStore = create<AuthState>((set:any) => ({
  token: initToken,
  isLoggedIn: !!initToken,

  setToken: (token: string | null) => {
    if (token) {
      cookies.set("token", token);
      set({ token, isLoggedIn: true });
    } else {
      cookies.remove("token");
      set({ token: null, isLoggedIn: false });
    }
  },

  removeToken: () => {
    cookies.remove("token");
    set({ token: null, isLoggedIn: false });
  },
}));

export { useAuthStore };

// export function useAuth() {
//   const { isLoggedIn, setToken, removeToken } = useAuthStore();

//   return {
//     isAuthenticated: isLoggedIn,
//     loading: false,
//     logout: removeToken,
//     login: setToken,
//   };
// }