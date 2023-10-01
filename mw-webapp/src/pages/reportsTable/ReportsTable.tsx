import {useMemo} from "react";
import {getCoreRowModel, HeaderGroup, RowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {Table} from "src/component/table/Table";
import {useGetDataTable} from "src/dataAccessLogic/useGetDataTable";
import {DayReport} from "src/model/businessModel/DayReport";


/**
 * Props table of reports
 */
export interface TableReports {
  /**
 * Table headers
 */
  headerGroup: HeaderGroup<DayReport>[];
  /**
 * Table rows
 */
  rowModel: RowModel<DayReport>;
}

/**
 * Render table of reports
 * @returns {Table}
 */
export const ReportsTable: React.FC = () => {
  const data = useGetDataTable();

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