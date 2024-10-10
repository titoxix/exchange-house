"use client";

import Table, { Item } from "@/components/table/Table";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { Image } from "@nextui-org/react";
//import { User } from "@/interfaces/user";

const columns = [
  { name: "BANDERA", uid: "flag" },
  { name: "CÓDIGO", uid: "code" },
  { name: "TASA DE COMPRA", uid: "buyRate" },
  { name: "TASA DE VENTA", uid: "sellRate" },
  { name: "TASA DEL MERCADO", uid: "marketRate" },
  { name: "ACTIONS", uid: "actions" },
];

interface Props {
  currencies: any[];
}

export default function CurrencyTable(props: Props) {
  const cellConfiguration = (
    cellValue: string,
    columnKey: string,
    item?: Item
  ) => {
    switch (columnKey) {
      case "flag":
        return (
          <Image
            alt="country-flag"
            height={40}
            width={40}
            radius="sm"
            src={`/flags/${item?.flag}`}
          />
        );
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
      items={props.currencies}
      cellConfiguration={cellConfiguration}
    />
  );
}
