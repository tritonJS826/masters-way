import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Ways table props
 */
interface WaysTableProps {

  /**
   * Ways table data
   */
  data: WayPreview[];

  /**
   * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
   * The tanstack table has a bug about typing columns:
   * https://github.com/TanStack/table/issues/4382
   * According to creators should only be using the column helper and not pre-typing columns
   * We can add type as:
   * ColumnDef<WayPreview, string & boolean & GoalPreview & userPreview & UserPreview[]>
   * but it's not recommend by creators
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<WayPreview, any>[];
}

/**
 * Render table of all ways preview
 */
export const WaysTable = (props: WaysTableProps) => {
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