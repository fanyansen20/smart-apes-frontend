export async function refreshAccessToken(tokenObject) {
  try {
    const refresh = {
      refresh_token: tokenObject.refreshToken,
    };
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "v1/user-auth/refresh-tokens",
      {
        method: "POST",
        body: JSON.stringify(refresh),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!tokenResponse.ok) {
      throw refreshToken;
    }

    const data = await tokenResponse.json();

    return {
      ...tokenObject,
      accessToken: data.access.token,
      accessTokenExpires: data.access.expires,
      refreshToken: data.refresh.token,
      refreshTokenExpires: data.refresh.expires,
    };
  } catch (error) {
    return {
      error: "RefreshAccessTokenError",
    };
  }
}
