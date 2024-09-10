import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import CustomerTable from "@/components/CustomerTable";
import CustomerForm from "@/components/CustomerForm";
import { Customer } from "@/interfaces/customer";
import { getCustomers } from "@/server/customers";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

async function getData(): Promise<{ customers: Customer[] }> {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  const { status, data: customers } = await getCustomers();

  if (status !== 200) return { customers: [] };

  if (customers) return { customers };

  return { customers: [] };
}

export default async function Customers() {
  const { customers } = await getData();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Clientes</span>
        <div className="flex gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            //value={filterValue}
            //onClear={() => onClear()}
            //onValueChange={onSearchChange}
          />
          <CustomerForm />
        </div>
        <CustomerTable customers={customers} />
      </section>
    </div>
  );
}
