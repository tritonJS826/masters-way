import {ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Reports table props
 */
interface ReportsTableProps {

  /**
   * Reports of specific way
   */
  data: DayReport[];

  /**
   * Reports table columns type
   * It's a bug of tanstack. We can't use type instead of any in this case.
   * That because this type depends on type of each columns of table.
   * The tanstack table has a bug about typing columns:
   * https://github.com/TanStack/table/issues/4382
   * According to creators should only be using the column helper and not pre-typing columns
   * We can add type as:
   * ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & MentorComment[] & string[] & boolean>
   * but it's not recommend by creators
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<DayReport, any>[];
}

/**
 * Render table of reports
 */
export const ReportsTable = (props: ReportsTableProps) => {
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