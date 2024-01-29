import {useEffect, useState} from "react";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WAYS_OWNER, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Own ways table props
 */
interface OwnWaysTableProps {

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
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);

  useEffect(() => {
    setOwnWays(props.ownWays);
  }, [props.ownWays]);

  const columnsToExclude = [WAYS_OWNER];

  const ownWaysTableColumns = waysColumns.filter(column => {
    if (column.header) {
      return !columnsToExclude.includes(column.header.toString());
    }
  });

  return (
    <>
      <Title
        text={`Own Ways (total amount: ${ownWays.length} ways)`}
        level={HeadingLevel.h2}
      />
      <WaysTable
        data={ownWays}
        columns={ownWaysTableColumns}
      />
    </>
  );
};
