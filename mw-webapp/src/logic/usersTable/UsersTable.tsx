import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Users table props
 */
interface UsersTableProps {

  /**
   * Users table data
   */
  data: UserPreview[];

  /**
   * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
   * The tanstack table has a bug about typing columns:
   * https://github.com/TanStack/table/issues/4382
   * According to creators should only be using the column helper and not pre-typing columns
   * We can add type as:
   * ColumnDef<UserPreview, string & string[]>
   * but it's not recommend by creators
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<UserPreview, any>[];
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
    <Table data={tableContent} />
  );
};