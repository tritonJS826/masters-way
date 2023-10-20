import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Own ways table props
 */
interface OwnWaysTableProps {

  /**
   * User Uuid
   */
  uuid: string;
}

/**
 * Render table of own ways preview
 */
export const OwnWaysTable = (props: OwnWaysTableProps) => {
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);

  /**
   * Load User own ways
   */
  const loadOwnWays = async () => {
    const data = await WayPreviewDAL.getOwnWaysPreview(props.uuid);
    setOwnWays(data);
  };

  useEffect(() => {
    loadOwnWays();
  }, []);

  const OWNER_NAME = "Owner's name";
  const OWNER_EMAIL = "Owner's email";

  const columnsToExclude = [OWNER_NAME, OWNER_EMAIL];

  const ownWaysTableColumns = columns.filter(column => {
    if (column.header) {
      return !columnsToExclude.includes(column.header.toString());
    }
  });

  return (
    <WaysTable
      data={ownWays}
      columns={ownWaysTableColumns}
    />
  );
};