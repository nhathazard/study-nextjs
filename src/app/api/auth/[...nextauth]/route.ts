import { sendRequest } from "@/utils/api";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "github") {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8080/api/v1/auth/social-media",
          method: "POST",
          body: {
            password: "123456",
            username: "nhatvandoan@gmail.com",
          },
        });
        console.log("check ", res);
      }
      return token;
    },
    session({ session, token, user }) {
      // session.user.address = "token.address";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
