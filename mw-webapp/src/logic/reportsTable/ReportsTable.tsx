import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {useGetDataTableReports} from "src/dataAccessLogic/useGetDataTableReports";
import {columns} from "src/logic/reportsTable/columns";

/**
 * Render table of reports
 * @returns {Table}
 */
export const ReportsTable: React.FC = () => {
  const data = useGetDataTableReports();

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