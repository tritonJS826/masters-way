import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {observer} from "mobx-react-lite";
import {Table} from "src/component/table/Table";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";

/**
 * Tests table props
 */
interface TestsTableProps {

  /**
   * Tests table data
   */
  data: TestPreview[];

  /**
   * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
   * Don't get rid of any https://github.com/TanStack/table/issues/4382
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TestPreview, any>[];
}

/**
 * Render table of all tests preview
 */
export const TestsTable = observer((props: TestsTableProps) => {
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
});
