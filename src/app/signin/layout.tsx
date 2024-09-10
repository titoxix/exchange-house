import { AppProvider } from "@/context";

export default function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col items-center">
        <main className="py-12 w-11/12 z-0">{children}</main>
      </div>
    </AppProvider>
  );
}
