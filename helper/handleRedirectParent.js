import { getSession } from "next-auth/react";

/**
 *
 * @param {{
 * additionalPathRedirect : string
 * notRedirect : boolean
 * }} props
 */

const handleRedirectParent = async ({
  additionalPathRedirect,
  notRedirect,
} = {}) => {
  const session = await getSession();

  const accessToken = `access_token=${encodeURIComponent(
    session?.accessToken
  )}`;
  const refreshToken = `refresh_token=${encodeURIComponent(
    session?.refreshToken
  )}`;
  const parentId = `parent_id=${encodeURIComponent(session?.user.id)}`;

  const path = "Path=/";
  const baseDomain = "smartapes.sg";
  const domain = `Domain=${baseDomain}`;

  const getAdditionalPathRedirect = additionalPathRedirect ?? "";

  document.cookie = `${accessToken}; SameSite=Lax; Secure; ${path}; ${domain}`;
  document.cookie = `${refreshToken}; SameSite=Lax; Secure; ${path}; ${domain}`;
  document.cookie = `${parentId}; SameSite=Lax; Secure; ${path}; ${domain}`;

  if (!notRedirect) {
    window.location = `${process.env.NEXT_PUBLIC_PARENT_URL}${getAdditionalPathRedirect}`;
  }
};

export default handleRedirectParent;
