import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {useGetDataTableReports} from "src/dataAccessLogic/useGetDataTableReports";
import {columns} from "src/pages/reportsTable/columns";

/**
 * Reports Table props
 */
interface ReportsTableProps {

  /**
   * Optional parameter to create Table for specific way
   */
  wayUuid?: string;
}

/**
 * Render table of reports
 * @returns {Table}
 */
export const ReportsTable = (props: ReportsTableProps) => {
  const data = useGetDataTableReports(props.wayUuid);

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