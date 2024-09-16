import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import Snackbar from "@/components/Snackbar";
import { AppProvider } from "@/context";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <div className="flex min-h-screen flex-col items-center">
          <Navbar />
          <main className="py-12 w-11/12 z-0">{children}</main>
          <Snackbar />
          <Backdrop />
        </div>
      </AppProvider>
    </SessionProvider>
  );
}
