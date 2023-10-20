import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

export type OwnedWaysTableProps = {

  /**
   * User Uuid
   */
  uuid: string;
}

/**
 * Render table of all ways preview
 */
export const OwnedWaysTable = (props: OwnedWaysTableProps) => {
  const [ownedWays, setOwnedWays] = useState<WayPreview[]>([]);

  /**
   * Load User owned ways
   */
  const loadOwnedWays = async () => {
    const data = await WayPreviewDAL.getOwnedWaysPreview(props.uuid);
    setOwnedWays(data);
  };

  useEffect(() => {
    loadOwnedWays();
  }, []);

  const columnsToExclude = ["Owner's name", "Owner's email"];

  const filteredColumns = columns.filter(column => {
    if (column.header) {
      return !columnsToExclude.includes(column.header.toString());
    }
  });

  return (
    <WaysTable
      data={ownedWays}
      columns={filteredColumns}
    />
  );
};