import { BaseService } from "./interceptor";
import { LoginRequest, LoginResponse } from "./types/login";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const payload = {
    username: data.username,
    password: data.password,
  };
  const response = await BaseService.post<LoginResponse>("auth/login", payload);
  return response;
}