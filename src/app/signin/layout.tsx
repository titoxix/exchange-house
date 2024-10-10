import { AppProvider } from "@/context";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <AppProvider>
      <div className="">
        <main className="">{children}</main>
      </div>
    </AppProvider>
  );
}
