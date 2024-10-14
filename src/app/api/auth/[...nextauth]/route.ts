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
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      // if (trigger === "signIn" && account?.provider !== "credentials") {
      //   const res = await sendRequest<IBackendRes<JWT>>({
      //     url: "http://localhost:8080/api/v1/auth/login",
      //     method: "POST",
      //     body: {
      //       password: "123456",
      //       username: "admin@gmail.com",
      //     },
      //   });
      //   console.log("check ", res);
      // }
      // if (trigger === "signIn" && account?.provider === "credentials") {
      //   const res = await sendRequest<IBackendRes<JWT>>({
      //     url: "http://localhost:8080/api/v1/auth/login",
      //     method: "POST",
      //     body: {
      //       password: "123456",
      //       username: "admin@gmail.com",
      //     },
      //   });
      //   console.log("check ", res);
      // }
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
