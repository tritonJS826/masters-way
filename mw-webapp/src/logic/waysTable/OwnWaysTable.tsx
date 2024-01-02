import {useState} from "react";
import {Button} from "src/component/button/Button";
import {displayNotification} from "src/component/notification/displayNotification";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {WAYS_OWNER, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Own Ways table props
 */
interface OwnWaysTableProps {

  /**
   * User uuid
   */
  uuid: string;

  /**
   * Is current authorized user is owner of current page
   */
  isPageOwner: boolean;

  /**
   * Function to change user own ways
   */
  handleOwnWaysChange: (ownWays: string[]) => void;
}

/**
 * Render table of own ways preview
 */
export const OwnWaysTable = (props: OwnWaysTableProps) => {
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => WayPreviewDAL.getUserWaysPreview(props.uuid, "Own");

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    displayNotification({text: error.message, type: "error"});
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: WayPreview[]) => {
    setOwnWays(data);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
      dependency: [props.uuid],
    },
  );

  /**
   * Create way
   */
  const createWay = async (userUuid: string, waysPreview: WayPreview[]) => {
    const newWay: Way = await WayDAL.createWay(userUuid);
    const newWayPreview: WayPreview = await WayPreviewDAL.getWayPreview(newWay.uuid);
    const ways = [newWayPreview, ...waysPreview];
    setOwnWays(ways);

    const waysUuid = ways.map((way) => way.uuid);
    props.handleOwnWaysChange(waysUuid);
  };

  const columnsToExclude = [WAYS_OWNER];

  const ownWaysTableColumns = waysColumns.filter(column => {
    if (column.header) {
      return !columnsToExclude.includes(column.header.toString());
    }
  });

  return (
    <>
      {props.isPageOwner &&
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
