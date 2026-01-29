import api from "@/lib/axios";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "agent" | "client";
  avatar?: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  login: async (email: string, role: string) => {
    // The backend endpoint is POST /auth/login
    // Based on user request, it seems it takes email and maybe password?
    // The previous mock took email and role.
    // The USER_REQUEST said: POST /auth/login: User login
    // Usually login takes email/password.
    // However, the current UI has a password field but the mock didn't use it.
    // I will send email and password if available, or just email/role if that's how the backend is designed?
    // Given the prompt "POST /auth/login: User login", I'll assume standard credentials.
    // But wait, the frontend has logic for "role" selection.
    // Let's assume the backend expects { email, password, role? } for this specific "static frontend" adaptation,
    // OR more likely, standard login is { email, password }.
    // Let's try to match the UI which collects email and password.
    // The `auth-context` called `login(email, role)`.
    // I will look at `authService` more closely.

    // For now, I will construct a payload. The UI input states 'password' is collected.
    // I will update the auth service to accept password.

    // BUT the Context only passed email and role. I need to update the context to pass password too.
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      role,
    });
    return response.data;
  },

  // Actually, looking at the UI, the login page collects `password` in state `password`.
  // The `handleLogin` function in `src/app/login/page.tsx` calls `login(email, role)`.
  // It completely ignores the password state!
  // I must fix this in `src/app/login/page.tsx` as well to pass the password.

  loginWithPassword: async (email: string, password: string, role: string) => {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
      role,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};
