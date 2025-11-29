import { apiFetch } from "./client";
import { clearAccessToken, setAccessToken } from "./token";

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  full_name: string;
  password: string;
  email: string;
};

export async function register(payload: RegisterPayload) {
  return apiFetch<{ token: string }>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload) {
  const response = await apiFetch<{ access_token: string }>("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setAccessToken(response.access_token);

  return response;
}

export function logout() {
  clearAccessToken();
}

/*export async function logout() {
  return apiFetch("/users/logout", {
    method: "POST",
  });
}*/

/*export async function refreshToken() {
  return apiFetch<{ token: string }>("/auth/refresh-token", {
    method: "POST",
  });
}*/
