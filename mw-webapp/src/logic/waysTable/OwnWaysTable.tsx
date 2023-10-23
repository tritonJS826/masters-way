import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns, OWNER_EMAIL, OWNER_NAME} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Props with User uuid
 */
export interface PropsWithUuid {

  /**
   * User uuid
   */
  uuid: string;
}

/**
 * Render table of own ways preview
 */
export const OwnWaysTable = (props: PropsWithUuid) => {
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);

  /**
   * Load User own ways
   */
  const loadOwnWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(props.uuid, "Own");
    setOwnWays(data);
  };

  useEffect(() => {
    loadOwnWays();
  }, []);

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