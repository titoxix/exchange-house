import Table, { Item } from "@/components/table/Table";
import { EditIcon } from "./icons/EditIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { Tooltip } from "@nextui-org/react";

const columns = [
  { name: "FECHA", uid: "date" },
  { name: "HORA", uid: "time" },
  { name: "TIPO", uid: "type" },
  { name: "COTIZACIÓN", uid: "price" },
  { name: "MONTO DOLARES", uid: "usdAmount" },
  { name: "MONTO PESOS", uid: "pesosAmount" },
  { name: "CLIENTE", uid: "customer" },
  // { name: "ACTIONS", uid: "actions" },
];

const orders = [
  {
    id: "f01e5115-15ea-435b-a8ed-cde16e263245",
    date: "01/04/2024",
    time: "10:00",
    type: "Compra",
    price: "38,45",
    usdAmount: "500",
    pesosAmount: "1000",
    customer: "Juan Perez",
  },
];
export default function OrdersTable() {
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
