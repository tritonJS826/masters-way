import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {getLastElementFromArray} from "src/utils/getLastElementFromArray";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

/**
 * Ways page
 */
export const AllWaysPage = () => {
  const [allWays, setAllWays] = useState<WayPreview[]>();
  const [lastWayUuid, setLastWayUuid] = useState<string>();
  const [allWaysAmount, setAllWaysAmount] = useState<number>();

  /**
   * Get amount of all ways
   */
  const getAllWaysAmount = async () => {
    const waysAmount = await WayPreviewDAL.getWaysPreviewAmount();
    setAllWaysAmount(waysAmount);
  };

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => {
    getAllWaysAmount();

    return WayPreviewDAL.getWaysPreview(lastWayUuid);
  };

  /**
   * Load more ways
   */
  const loadMoreWays = async () => {
    const ways = await WayPreviewDAL.getWaysPreview(lastWayUuid);
    allWays && setAllWays([...allWays, ...ways]);

    const lastWay = getLastElementFromArray(ways);
    lastWay && setLastWayUuid(lastWay.uuid);
  };

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
    const lastWay = getLastElementFromArray(data);
    lastWay && setLastWayUuid(lastWay.uuid);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
    },
  );

  if (!allWays) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={`Ways (${allWays.length})`}
        />
        <Title
          level={HeadingLevel.h2}
          text={`Total found: ${allWaysAmount}`}
        />
      </HorizontalContainer>
      <ScrollableBlock>
        <WaysTable
          data={allWays}
          columns={waysColumns}
        />
      </ScrollableBlock>
      <Button
        value="More ways"
        onClick={() => loadMoreWays()}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
    </>
  );
};
