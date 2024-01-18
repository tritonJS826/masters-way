import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {WAYS_OWNER, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/waysTable/OwnWaysTable.module.scss";

/**
 * Own ways table props
 */
interface OwnWaysTableProps {

  /**
   * User's uuid
   */
  uuid: string;

  /**
   * User's own ways preview
   */
  ownWays: WayPreview[];

  /**
   * Is current authorized user is owner of current page
   */
  isPageOwner: boolean;

}

/**
 * Render table of own ways preview
 */
export const OwnWaysTable = (props: OwnWaysTableProps) => {
  const navigate = useNavigate();
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);

  useEffect(() => {
    setOwnWays(props.ownWays);
  }, [props.ownWays]);

  /**
   * Create way
   */
  const createWay = async (userUuid: string) => {
    const newWay: Way = await WayDAL.createWay(userUuid);
    navigate(pages.way.getPath({uuid: newWay.uuid}));
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
          onClick={() => createWay(props.uuid)}
          buttonType={ButtonType.PRIMARY}
        />
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
