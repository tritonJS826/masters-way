import {useState} from "react";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Ways page
 */
export const AllWaysPage = () => {
  const [allWays, setAllWays] = useState<WayPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => WayPreviewDAL.getWaysPreview();

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
    setAllWays(data);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
      dependencies: [],
    },
  );

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
          columns={waysColumns}
        />
      </ScrollableBlock>
    </>
  );
};
