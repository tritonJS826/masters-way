import {useEffect, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/allWaysPage/allWaysTable/columns";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Render table of all ways preview
 */
export const AllWaysTable = () => {
  const [allWays, setAllWays] = useState<WayPreview[]>([]);

  /**
   * Receives and transfer data of ways
   */
  const loadAllWays = async () => {
    const data = await WayPreviewDAL.getWaysPreview();
    setAllWays(data);
  };

  useEffect(() => {
    loadAllWays();
  }, []);

  const data = allWays;

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