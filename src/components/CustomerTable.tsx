"use client";

import Table, { Item } from "@/components/table/Table";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { Customer } from "@/interfaces/customer";

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "APELLIDO", uid: "lastName" },
  { name: "TELEFONO", uid: "phone" },
  { name: "ACTIONS", uid: "actions" },
];

interface Props {
  customers: Customer[];
}

export default function CustomerTable(props: Props) {
  const cellConfiguration = (
    cellValue: string,
    columnKey: string,
    item?: Item
  ) => {
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Table
      columns={columns}
      items={props.customers}
      cellConfiguration={cellConfiguration}
    />
  );
}
