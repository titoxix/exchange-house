import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import CustomerTable from "@/components/CustomerTable";
import CustomerForm from "@/components/CustomerForm";

export default function Customers() {
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
        <CustomerTable />
      </section>
    </div>
  );
}
