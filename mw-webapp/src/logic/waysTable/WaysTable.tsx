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
   * Ways table columns type
   * It's a bug of tanstack. We can't use type instead of any in this case.
   * That because this type depends on type of each columns of table.
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