import {useEffect, useState} from "react";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Ways page
 */
export const AllWaysPage = () => {
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
    <>
      <Title
        level={HeadingLevel.h2}
        text="Ways page"
      />
      <Title
        level={HeadingLevel.h3}
        text={`All ways (total amount: ${allWays.length} ways)`}
      />
      <ScrollableBlock>
        <WaysTable
          data={allWays}
          columns={columns}
        />
      </ScrollableBlock>
    </>
  );
};
