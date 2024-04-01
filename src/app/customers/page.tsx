"use client";
import Table from "@/components/table/Table";
import { Button, Input } from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";

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
          <Button color="primary" endContent={<PlusIcon />}>
            Agregar cliente
          </Button>
        </div>
        <Table />
      </section>
    </div>
  );
}
