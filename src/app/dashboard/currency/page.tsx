import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import CurrencyTable from "@/components/currency/CurrencyTable";
import CurrencyForm from "@/components/currency/CurrencyForm";

async function getData(): Promise<any> {
  const session = await auth();

  if (!session?.user) redirect("/signin");

  redirect("/dashboard"); //Redirect to dashboard temporarily

  /*   const currencies = [
    {
      id: 1,
      flag: "united-states.png",
      code: "USD",
      buyRate: 40.45,
      sellRate: 42.65,
      marketRate: 41.35,
    },
  ];

  return { currencies }; */
}

export default async function Currency() {
  const { currencies } = await getData();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Gestión de divisas</span>
        <div className="flex gap-3">
          <CurrencyForm />
        </div>
        <CurrencyTable currencies={currencies} />
      </section>
    </div>
  );
}
