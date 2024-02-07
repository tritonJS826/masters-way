import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {LAST_INDEX} from "src/logic/mathConstants";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

/**
 * Fetched data params
 */
interface AllWaysPageFetchDataParams {

  /**
   * Fetched ways
   */
  ways: WayPreview[];

  /**
   * Amount of all ways
   */
  waysAmount: number;
}

/**
 * Ways page
 */
export const AllWaysPage = () => {
  const [allWays, setAllWays] = useState<WayPreview[]>();
  const [allWaysAmount, setAllWaysAmount] = useState<number>();

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllWaysPageFetchDataParams> => {
    const waysPromise = WayPreviewDAL.getWaysPreview();
    const waysAmountPromise = WayPreviewDAL.getWaysPreviewAmount();

    const [
      ways,
      waysAmount,
    ] = await Promise.all([
      waysPromise,
      waysAmountPromise,
    ]);

    return {ways, waysAmount};
  };

  /**
   * Load more ways
   */
  const loadMoreWays = async (loadedWays: WayPreview[]) => {
    const lastWayUuid = loadedWays.at(LAST_INDEX)?.uuid;

    const ways = await WayPreviewDAL.getWaysPreview(lastWayUuid);
    setAllWays([...loadedWays, ...ways]);
  };

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    // TODO #511: research how onError works in app
    displayNotification({text: error.message, type: "error"});
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: AllWaysPageFetchDataParams) => {
    setAllWays(data.ways);
    setAllWaysAmount(data.waysAmount);
  };

  useLoad({
    loadData,
    onSuccess,
    onError,
  });

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
        onClick={() => loadMoreWays(allWays)}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
    </>
  );
};
