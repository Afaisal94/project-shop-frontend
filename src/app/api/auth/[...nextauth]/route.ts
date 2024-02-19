import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/hooks/useAuth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const email = credentials.email;
        const password = credentials.password;
        try {
          const response = await loginUser(email, password);

          return {
            id: response?.user.id,
            name: response?.user.name,
            email: response?.user.email,
            role: response?.user.role,
            accessToken: response?.authorization.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: ({ session, token }: { session: any; token: any }) => {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
});

export { handler as GET, handler as POST };
