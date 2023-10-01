import {useMemo} from "react";
import {getCoreRowModel, HeaderGroup, RowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {Table} from "src/component/table/Table";
import {DayReport} from "src/model/businessModel/DayReport";
import {useGetDataTable} from "src/service/TableService";

/**
 * Generated data of table reports
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
 * Wrapper for receiving {@link DayReport[]} data and transferring it to table
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