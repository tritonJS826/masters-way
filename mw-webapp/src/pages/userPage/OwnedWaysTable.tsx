import {useEffect, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {User} from "firebase/auth";
import {Table} from "src/component/table/Table";
import {WayDALPreview} from "src/dataAccessLogic/WayDALPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {columns} from "src/pages/userPage/columns";

type OwnedWaysTableProps = {

  /**
   * Dsdsds
   */
  user: User;
}

/**
 * Render table of all ways preview
 */
export const OwnedWaysTable = (props: OwnedWaysTableProps) => {
  const [ownedWays, setOwnedWays] = useState<WayPreview[]>([]);

  /**
   * Sdsdsd
   */
  const loadOwnedWays = async (user: User) => {
    const data = await WayDALPreview.getOwnedWaysPreview(user.uid);
    setOwnedWays(data);
  };

  useEffect(() => {
    loadOwnedWays(props.user);
  }, []);

  const table = useReactTable({
    data: ownedWays,
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