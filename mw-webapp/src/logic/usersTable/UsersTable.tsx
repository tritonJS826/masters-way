import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Ways table props
 */
interface UsersTableProps {

  /**
   * Ways table data
   */
  data: UserPreview[];

  /**
   * Ways table columns type
   * It's a bug of tanstack. We can't use type instead of any in this case.
   * That because this type depends on type of each columns of table.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<UserPreview, any>[];
}

/**
 * Render table of all ways preview
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