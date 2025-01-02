"use client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "Enter email or username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          function isEmail(identifier) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(identifier);
          }

          const payload = {
            password: credentials.password,
            ...(isEmail(credentials.identifier)
              ? { email: credentials.identifier }
              : { username: credentials.identifier }),
          };

          let res = true;

          if (
            payload.username == "intanamenities" &&
            payload.password == "admin123"
          ) {
            res = true;
          } else {
            res = false;
          }

          if (!res) {
            throw new Error(user.message);
          }

          if (res) {
            return {
              token: "token123123",
            };
          }

          return null;
        } catch (error) {
          throw new Error(error?.message ?? "Oops, something went wrong!");
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_PUBLIC_SECRET,
  pages: {
    signIn: "/",
    signOut: "/login",
  },
  session: {
    jwt: true,
    maxAge: 60 * 60, // 1 hour in seconds
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger == "update") {
        return { ...token, ...session.user };
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async signIn(message) {
      if (message?.error === "Need activate account") {
        return "/login/activation";
      }

      if (message?.error === "Need approve admin") {
        return "/login/approve";
      }
    },
  },
});
