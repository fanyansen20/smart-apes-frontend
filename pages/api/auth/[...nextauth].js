import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { refreshAccessToken } from "utils/auth";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const userInput = {
          email: credentials.email,
          password: credentials.password,
        };
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "v1/user-auth/login",
          {
            method: "POST",
            body: JSON.stringify(userInput),
            headers: {
              "Content-Type": "application/json",
              "Captcha-Token": credentials.tokenCaptcha,
            },
          }
        );

        const user = await response.json();

        if (response.ok) {
          console.log("user", user);
          return user;
        } else {
          throw new Error(user.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.tokens.access.token;
        token.accessTokenExpires = user.tokens.access.expires;
        token.refreshToken = user.tokens.refresh.token;
        token.refreshTokenExpires = user.tokens.refresh.expires;
      }

      // If refreshToken expired
      const checkRefreshTokenExpired = Math.round(
        Date.parse(token.refreshTokenExpires) - Date.now()
      );

      if (checkRefreshTokenExpired > 0) {
        // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
        const checkAccessTokenExpires = Math.round(
          Date.parse(token.accessTokenExpires) - Date.now()
        );

        //Return refreshed token if access token expired
        if (checkAccessTokenExpires <= 0) {
          token = await refreshAccessToken(token);
        }
        return token;
      }
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.refreshToken = token.refreshToken;
      session.refreshTokenExpires = token.refreshTokenExpires;

      return session;
    },
    async redirect({ baseUrl }) {
      if (process.env.NEXT_PUBLIC_MARKET_PLACE_URL) {
        return process.env.NEXT_PUBLIC_MARKET_PLACE_URL;
      } else {
        return baseUrl;
      }
    },
  },
};

export default NextAuth(authOptions);
