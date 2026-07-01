import type { User } from "@/types/auth";

export interface AuthState {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  loading: boolean;

  error: string | null;
}