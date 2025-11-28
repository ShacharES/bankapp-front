import { apiFetch } from "./client";
import { setAccessToken } from "./token";

export type LoginPayload = {
  username: string;
  password: string;
};

export async function register(payload: LoginPayload) {
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
