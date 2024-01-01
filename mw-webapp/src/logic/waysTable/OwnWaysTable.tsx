import {useEffect, useState} from "react";
import {Button, StylesType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {WAYS_OWNER, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/waysTable/OwnWaysTable.module.scss";

/**
 * Own ways table props
 */
interface OwnWaysTableProps {

  /**
   * User's uuid
   */
  uuid: string;

}

/**
 * Render table of own ways preview
 */
export const OwnWaysTable = (props: OwnWaysTableProps) => {
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);
  const userPreviewUuid = props.uuid;

  /**
   * Load User own ways
   */
  const loadOwnWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(userPreviewUuid, "Own");
    setOwnWays(data);
  };

  useEffect(() => {
    loadOwnWays();
  }, [userPreviewUuid]);

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
      <HorizontalContainer className={styles.gap}>
        <Title
          text= {`Own Ways (total amount: ${ownWays.length} ways)`}
          level={HeadingLevel.h2}
        />
        {userPreviewUuid &&
        <Tooltip content="Create new way">
          <Button
            value="Create new way"
            onClick={() => createWay(userPreviewUuid, ownWays)}
            styleType={StylesType.PRIMARY}
          />
        </Tooltip>
        }
      </HorizontalContainer>
      <WaysTable
        data={ownWays}
        columns={ownWaysTableColumns}
      />
    </>
  );
};
