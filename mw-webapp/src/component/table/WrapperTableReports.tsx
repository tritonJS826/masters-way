import {useMemo} from "react";
import {getCoreRowModel, HeaderGroup, RowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {Table} from "src/component/table/Table";
import {DayReport} from "src/model/businessModel/DayReport";
import {useGetDataTable} from "src/service/TableService";

/**
 * Table's reports data props
 */
export interface TableReports {
  /**
 * Group headers table
 */
  headerGroup: HeaderGroup<DayReport>[];
  /**
 * Object rows table
 */
  rowModel: RowModel<DayReport>;
}

export const WrapperTableReports: React.FC = () => {
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