import React from "react";
import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export interface Item {
  [key: string]: string | number;
}
interface Props {
  columns: {
    name: string;
    uid: string;
  }[];
  items: Item[];
  cellConfiguration?: (
    cellValue: string,
    columnKey: string,
    item?: Item
  ) =>
    | React.ReactNode
    | string
    | number
    | JSX.Element
    | JSX.Element[]
    | null
    | undefined;
}

export default function Table({ columns, items, cellConfiguration }: Props) {
  const renderCell = React.useCallback(
    (item: Item, columnKey: any) => {
      const cellValue = item[columnKey];

      return cellConfiguration
        ? cellConfiguration(cellValue as string, columnKey, item)
        : cellValue;
    },
    [cellConfiguration]
  );

  return (
    <NextUITable aria-label="Table with last ordes">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
}
