"use client";

import Table, { Item } from "@/components/table/Table";
import { Tooltip } from "@nextui-org/react";
import { AccountType } from "@/interfaces/account";
import DeleteRowElement from "@/components/DeleteRowElement";
import { deleteAccountTypeAction } from "@/actions/account";

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "CANTIDAD", uid: "accountsQuantity" },
  { name: "ACCIONES", uid: "actions" },
];

interface Props {
  accounts: AccountType[];
}

export default function AccountTypesTable(props: Props) {
  const cellConfiguration = (
    cellValue: string,
    columnKey: string,
    item?: Item
  ) => {
    switch (columnKey) {
      case "accountsQuantity":
        const accountsQuantity = Array.isArray(item?.accountsQuantity)
          ? item?.accountsQuantity.length
          : 0;
        return (
          <div className="flex justify-center w-14">
            <span>{accountsQuantity}</span>
          </div>
        );
      case "actions":
        const accountTypeData = item as unknown as AccountType;
        return (
          <div className="relative flex items-center justify-center gap-1">
            <Tooltip color="danger" content="Eliminar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteRowElement
                  mainTitle="Eliminar tipo de cuenta"
                  actionButtonTitle="Eliminar"
                  acceptAction={() =>
                    deleteAccountTypeAction(accountTypeData.id)
                  }
                />
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
      items={props.accounts}
      cellConfiguration={cellConfiguration}
    />
  );
}
