import { LoginRequest, LoginResponse } from "../user";

export interface UserContextValue {
  handleLogin: (data: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}