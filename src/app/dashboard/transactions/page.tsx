import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { getAllOrdersByUserId } from "@/server/orders";

async function getInitialData() {
  const session = await auth();
  if (!session?.user) redirect("/login");
}

export default async function Transactions() {
  //await getInitialData();
  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <p className="text-lg font-bold">Operaciones</p>
      </section>
    </div>
  );
}
