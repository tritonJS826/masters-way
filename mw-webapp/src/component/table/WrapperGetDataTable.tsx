import {createContext, PropsWithChildren, useMemo} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {TableUsers} from "src/component/table/Table";
import {useGetDataTable} from "src/service/TableService";

/**
 * Users table context
 */
export const TableUsersContext = createContext<null | TableUsers>(null);

/**
 * Wrapper that prepares data for the table
 */
export const WrapperGetDataTable: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const data = useGetDataTable();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroup = table.getHeaderGroups();
  const rowModel = table.getRowModel();

  const tableContent = useMemo(() => {
    return {headerGroup, rowModel};
  }, [data]);

  return (
    <TableUsersContext.Provider value={tableContent}>
      {props.children}
    </TableUsersContext.Provider>
  );
};