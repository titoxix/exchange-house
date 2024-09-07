import { auth } from "../../../auth";
import { redirect } from "next/navigation";

async function getInitialData() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
}

export default async function Transactions() {
  await getInitialData();
  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <p className="text-lg font-bold">Operaciones</p>
      </section>
    </div>
  );
}
