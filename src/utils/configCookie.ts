import { DataToken } from "@/types/grade-types";

export function StoreCookie(dataToken: DataToken) {
  setCookie("role_access", dataToken.role_access);
  setCookie("token_access", dataToken.token_access);
  setCookie("token_access_expired", dataToken.token_access_expired.toString());
  setCookie("token_refresh", dataToken.token_refresh);
  setCookie("token_refresh_expired", dataToken.token_refresh_expired.toString());

}

export function getDataCookie() {
  const roleAccess = getCookie("role_access");
  const accessToken = getCookie("token_access");
  const refreshAccessToken = getCookie("token_refresh");
  const accessTokenExpired = getCookie("token_access_expired");
  const refreshAccessTokenExpired = getCookie("token_refresh_expired");

  return {
    roleAccess,
    accessToken,
    refreshAccessToken,
    accessTokenExpired,
    refreshAccessTokenExpired,
  };
}

export function removeCookie() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function setCookie(name: string, value: string) {
  document.cookie = name + "=" + (value || "") + "; path=/";
}

function getCookie(name: string) {
  if (typeof document !== "undefined") {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let c of ca) {
      if (c.trim().startsWith(nameEQ)) return c.trim().substring(nameEQ.length, c.length);
    }
  }
  return null;
}
