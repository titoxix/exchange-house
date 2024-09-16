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
      <div className="flex min-h-screen flex-col items-center">
        <main className="py-12 w-11/12 z-0">{children}</main>
      </div>
    </AppProvider>
  );
}
