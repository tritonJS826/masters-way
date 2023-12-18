import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {WAYS_OWNER, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {Way} from "src/model/businessModel/Way";
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
  }, [props.uuid]);

  /**
   * Create way
   */
  const createWay = async(userUuid: string, waysPreview: WayPreview[]) => {
    const newWay: Way = await WayDAL.createWay(userUuid);
    const newWayPreview: WayPreview = await WayPreviewDAL.getWayPreview(newWay.uuid);
    const ways = [newWayPreview, ...waysPreview];
    setOwnWays(ways);
  };

  const columnsToExclude = [WAYS_OWNER];

  const ownWaysTableColumns = waysColumns.filter(column => {
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
