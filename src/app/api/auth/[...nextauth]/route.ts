import { sendRequest } from "@/utils/api";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8080/api/v1/auth/login",
          method: "POST",
          body: {
            password: credentials?.password,
            username: credentials?.username,
          },
        });
        if (res && res.data) {
          return res.data as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.user = user.user;
        console.log("token.access_token", token.access_token);
      }
      if (trigger === "signIn" && account?.provider !== "credentials") {
        console.log("token", token);

        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.user = user.user;
      }
      return token;
    },
    session({ session, token, user }) {
      //@ts-ignore
      session.access_token = token.access_token;
      //@ts-ignore
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
