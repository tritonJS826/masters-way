import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns, WAYS_OWNER} from "src/logic/waysTable/columns";
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

  /**
   * Create way
   */
  const createWay = async(userUuid: string, waysData: WayPreview[]) => {
    const newWay = await WayPreviewDAL.createWayPreview(userUuid);
    const ways = [...waysData, newWay];
    setOwnWays(ways);
  };

  const columnsToExclude = [WAYS_OWNER];

  const ownWaysTableColumns = columns.filter(column => {
    if (column.header) {
      return !columnsToExclude.includes(column.header.toString());
    }
  });

  return (
    <>
      {props.uuid &&
        <Button
          value="Create new way"
          onClick={() => createWay(props.uuid, ownWays)}
        />
      }
      <WaysTable
        data={ownWays}
        columns={ownWaysTableColumns}
      />
    </>
  );
};