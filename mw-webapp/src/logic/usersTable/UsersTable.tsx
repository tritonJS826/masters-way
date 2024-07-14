import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {allUsersAccessIds} from "cypress/accessIds/allUsersAccessIds";
import {Table} from "src/component/table/Table";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";

/**
 * Users table props
 */
interface UsersTableProps {

  /**
   * Users table data
   */
  data: UserNotSaturatedWay[];

  /**
   * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
   * Don't get rid of any https://github.com/TanStack/table/issues/4382
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<UserNotSaturatedWay, any>[];
}

/**
 * Render table of all users preview
 */
export const UsersTable = (props: UsersTableProps) => {
  const data = props.data;
  const columns = props.columns;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroup = table.getHeaderGroups();
  const rowModel = table.getRowModel();

  const tableContent = {headerGroup, rowModel};

  return (
    <Table
      data={tableContent}
      dataCy={{dataCyTBodyTr: allUsersAccessIds.allUsersTable.tableBodyTr}}
    />
  );
};
