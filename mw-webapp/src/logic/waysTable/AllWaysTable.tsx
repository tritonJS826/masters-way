import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
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

  return (
    <WaysTable
      data={allWays}
      columns={columns}
    />
  );
};