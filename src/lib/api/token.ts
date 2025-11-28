const ACCESS_TOKEN_KEY = "access_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // Ignore write failures (e.g. private mode)
  }
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // Ignore delete failures
  }
}
