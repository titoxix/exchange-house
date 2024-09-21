"use client";

import Table, { Item } from "@/components/table/Table";
import { EditIcon } from "./icons/EditIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { Chip, ChipProps, Tooltip } from "@nextui-org/react";
import { Order } from "@/interfaces/order";
import { formatCurrency } from "@/utils/currency";

const columns = [
  { name: "FECHA", uid: "date" },
  { name: "HORA", uid: "time" },
  { name: "TIPO", uid: "type" },
  { name: "COTIZACIÓN", uid: "price" },
  { name: "MONTO DOLARES", uid: "usdAmount" },
  { name: "MONTO PESOS", uid: "pesosAmount" },
  { name: "CLIENTE", uid: "customerName" },
  //{ name: "ACCIONES", uid: "actions" },
];

interface Props {
  orders: Order[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  BUY: "success",
  SELL: "warning",
};

export default function OrdersTable({ orders }: Props) {
  const cellConfiguration = (cellValue: string, columnKey: string) => {
    switch (columnKey) {
      /*  case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar Orden">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        ); */
      case "type":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue === "BUY" ? "COMPRA" : "VENTA"}
          </Chip>
        );
      case "price":
        return <p>{formatCurrency(Number(cellValue), "es-UY", "USD")}</p>;
      case "usdAmount":
        return <p>{formatCurrency(Number(cellValue), "es-UY", "USD")}</p>;
      case "pesosAmount":
        return <p>{formatCurrency(Number(cellValue), "es-UY", "UYU")}</p>;
      default:
        return cellValue;
    }
  };
  return (
    <Table
      columns={columns}
      items={orders}
      cellConfiguration={cellConfiguration}
      emptyStateMessage="No hay órdenes para mostrar"
    />
  );
}
