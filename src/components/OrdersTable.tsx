import Table, { Item } from "@/components/table/Table";
import { EditIcon } from "./icons/EditIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { Tooltip } from "@nextui-org/react";
import { Order } from "@/interfaces/order";

const columns = [
  { name: "FECHA", uid: "date" },
  { name: "HORA", uid: "time" },
  { name: "TIPO", uid: "type" },
  { name: "COTIZACIÓN", uid: "price" },
  { name: "MONTO DOLARES", uid: "usdAmount" },
  { name: "MONTO PESOS", uid: "pesosAmount" },
  { name: "CLIENTE", uid: "customerName" },
  // { name: "ACTIONS", uid: "actions" },
];

interface Props {
  orders: Order[];
}
export default function OrdersTable({ orders }: Props) {
  /* const cellConfiguration = (cellValue: string, columnKey: string) => {
    switch (columnKey) {
      case "actions":
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
        );
      default:
        return cellValue;
    }
  }; */
  return (
    <Table
      columns={columns}
      items={orders}
      //cellConfiguration={cellConfiguration}
    />
  );
}
