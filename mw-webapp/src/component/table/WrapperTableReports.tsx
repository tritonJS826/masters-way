import {useMemo} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {Table} from "src/component/table/Table";
import {useGetDataTable} from "src/service/TableService";

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