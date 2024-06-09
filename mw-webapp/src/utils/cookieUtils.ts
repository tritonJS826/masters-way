/**
 * Check for some cookie existence
 */
export function isCookieExists(cookieName: string) {
  let isExist = false;

  document.cookie.split("; ").forEach((cookie) => {
    const isCookieExist = cookie.includes(cookieName);
    if (isCookieExist) {
      isExist = true;
    }
  });

  return isExist;
}

const AUTH_COOKIE_PUBLIC_NAME = "auth-session-public";

/**
 * Check is public auth cookie exist
 */
export function isAuthCookieExists() {
  return isCookieExists(AUTH_COOKIE_PUBLIC_NAME);
}
