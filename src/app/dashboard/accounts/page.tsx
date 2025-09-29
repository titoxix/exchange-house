import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import AccountForm from "@/components/accounts/AccountForm";
import AccountTable from "@/components/accounts/AccountTable";
import { getCustomers } from "@/server/customers";
import { Customer } from "@/interfaces/customer";

async function getData(): Promise<{
  customers: Omit<Customer, "companyId">[];
}> {
  const session = await auth();

  if (!session?.user) redirect("/signin");

  try {
    const { status: statusCustomers, data: customers } = await getCustomers(
      session?.user.companyId
    );
    return {
      customers: statusCustomers === 200 ? customers : [],
    };
  } catch (error) {
    return {
      customers: [],
    };
  }
}

export default async function Accounts() {
  const { customers } = await getData();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Gestión de Cuentas</span>
        <div className="flex gap-3">
          <AccountForm customers={customers} />
        </div>
        <AccountTable accounts={[]} />
      </section>
    </div>
  );
}
