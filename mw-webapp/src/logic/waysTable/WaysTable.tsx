import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {allWaysAccessIds} from "cypress/accessIds/allWaysAccessIds";
import {observer} from "mobx-react-lite";
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
   * Don't get rid of any https://github.com/TanStack/table/issues/4382
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<WayPreview, any>[];
}

/**
 * Render table of all ways preview
 */
export const WaysTable = observer((props: WaysTableProps) => {
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
      dataCy={allWaysAccessIds.allWaysTable.table}
      dataCyTr={allWaysAccessIds.allWaysTable.tableTr}
    />
  );
});
