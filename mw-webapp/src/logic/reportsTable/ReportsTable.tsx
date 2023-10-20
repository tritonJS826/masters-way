import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {columns} from "src/logic/reportsTable/columns";
import {loadAllDayReports} from "src/logic/reportsTable/loadAllDayReports";

/**
 * Render table of reports
 */
export const ReportsTable = () => {
  const data = loadAllDayReports();

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