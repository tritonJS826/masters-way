import {useMemo} from "react";
import {getCoreRowModel, HeaderGroup, RowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {Table} from "src/component/table/Table";
import {useGetDataTableReports} from "src/dataAccessLogic/useGetDataTable";

/**
 * Props table of reports
 */
export interface TableReportsProps<T> {
  /**
 * Table headers
 */
  headerGroup: HeaderGroup<T>[];
  /**
 * Table rows
 */
  rowModel: RowModel<T>;
}

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

  const tableContent = useMemo(() => {
    return {headerGroup, rowModel};
  }, [data]);

  return (
    <Table data={tableContent} />
  );
};