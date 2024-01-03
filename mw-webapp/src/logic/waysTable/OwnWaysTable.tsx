import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {displayNotification} from "src/component/notification/Notification";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {WAYS_OWNER, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/waysTable/OwnWaysTable.module.scss";

/**
 * Own Ways table props
 */
interface OwnWaysTableProps {

  /**
   * User's uuid
   */
  uuid: string;

  /**
   * Is current authorized user is owner of current page
   */
  isPageOwner: boolean;

  /**
   * User's own way uuids
   */
  ownWayUuids: string[];

}

/**
 * Render table of own ways preview
 */
export const OwnWaysTable = (props: OwnWaysTableProps) => {
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => Promise.all(props.ownWayUuids.map(WayPreviewDAL.getWayPreview));

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
      dependency: [props.ownWayUuids],
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
      <Tooltip content="Create new way">
        <Button
          value="Create new way"
          onClick={() => createWay(props.uuid, ownWays)}
          buttonType={ButtonType.PRIMARY}
        />
      </Tooltip>
      }
      <HorizontalContainer className={styles.gap}>
        <Title
          text={`Own Ways (total amount: ${ownWays.length} ways)`}
          level={HeadingLevel.h2}
        />
      </HorizontalContainer>
      <WaysTable
        data={ownWays}
        columns={ownWaysTableColumns}
      />
    </>
  );
};
