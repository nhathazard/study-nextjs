import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  console.log("session1", session);
  if (session) {
    redirect("/");
  }

  return <div>sigin in page</div>;
}
