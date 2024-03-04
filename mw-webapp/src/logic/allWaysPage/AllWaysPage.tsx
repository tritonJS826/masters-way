import {useState} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayCard} from "src/component/wayCard/WayCard";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {LAST_INDEX} from "src/logic/mathConstants";
import {FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {getWaysFilter} from "src/logic/waysTable/wayFilter";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {AllWaysPageSettings, View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

const DEFAULT_ALL_WAYS_PAGE_SETTINGS: AllWaysPageSettings = {
  filterStatus: FILTER_STATUS_ALL_VALUE,
  view: View.Card,
};

/**
 * Safe opened tab from localStorage
 */
const allWaysPageSettingsValidator = (currentSettings: AllWaysPageSettings) => {
  return !!currentSettings.filterStatus;
};

/**
 * Fetched data
 */
interface AllWaysFetchData {

  /**
   * Fetched ways
   */
  ways: WayPreview[];

  /**
   * Amount of filtered ways
   */
  waysAmount: number;
}

/**
 * Ways page
 */
export const AllWaysPage = () => {
  const [allWays, setAllWays] = useState<WayPreview[]>();
  const [allWaysAmount, setAllWaysAmount] = useState<number>();

  const isMoreWaysExist = allWays && allWaysAmount && allWays.length < allWaysAmount;

  const [allWaysPageSettings, updateAllWaysPageSettings] = usePersistanceState({
    key: "allWaysPage",
    defaultValue: DEFAULT_ALL_WAYS_PAGE_SETTINGS,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentSettings: AllWaysPageSettings,
    ) => allWaysPageSettingsValidator(currentSettings),
  });

  const filter = getWaysFilter(allWaysPageSettings.filterStatus);

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllWaysFetchData> => {
    const [
      ways,
      waysAmount,
    ] = await Promise.all([
      WayPreviewDAL.getWaysPreview({filter}),
      WayPreviewDAL.getWaysPreviewAmount(filter),
    ]);

    return {ways, waysAmount};
  };

  /**
   * Load more ways
   */
  const loadMoreWays = async (loadedWays: WayPreview[]) => {
    const lastWayUuid = loadedWays.at(LAST_INDEX)?.uuid;

    const ways = await WayPreviewDAL.getWaysPreview({filter, lastWayUuid});
    setAllWays([...loadedWays, ...ways]);
  };

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    // TODO #511: research how onError works in app and update onError (we need to get error on firebase statistics)
    displayNotification({text: error.message, type: "error"});
    throw error;
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: AllWaysFetchData) => {
    setAllWays(data.ways);
    setAllWaysAmount(data.waysAmount);
  };

  useLoad({
    loadData,
    onSuccess,
    onError,
    dependency: [allWaysPageSettings.filterStatus],
  });

  if (!allWays) {
    return (
      <Loader />
    );
  }

  return (
    <VerticalContainer className={styles.allWaysContainer}>
      <HorizontalContainer className={styles.filterView}>
        <Select
          label="Show only: "
          value={allWaysPageSettings.filterStatus}
          name="filterStatus"
          options={[
            {id: "1", value: FILTER_STATUS_ALL_VALUE, text: "All"},
            {id: "2", value: WayStatus.Completed, text: "Completed"},
            {id: "3", value: WayStatus.Abandoned, text: "Abandoned"},
            {id: "4", value: WayStatus.InProgress, text: "InProgress"},
          ]}
          onChange={(value) => updateAllWaysPageSettings({filterStatus: value, view: allWaysPageSettings.view})}
        />

        <HorizontalContainer className={styles.iconsView}>
          <Tooltip
            position={PositionTooltip.LEFT}
            content={`Switch to ${View.Card} view`}
          >
            <button
              className={styles.iconView}
              onClick={() =>
                updateAllWaysPageSettings({
                  filterStatus: allWaysPageSettings.filterStatus,
                  view: View.Card,
                })}
            >
              <Icon
                size={IconSize.MEDIUM}
                name={"GridViewIcon"}
                className={clsx(allWaysPageSettings.view === View.Card && styles.activeView)}
              />
            </button>
          </Tooltip>
          <Tooltip
            position={PositionTooltip.LEFT}
            content={`Switch to ${View.Table} view`}
          >
            <button
              className={styles.iconView}
              onClick={() =>
                updateAllWaysPageSettings({
                  filterStatus: allWaysPageSettings.filterStatus,
                  view: View.Table,
                })}
            >
              <Icon
                size={IconSize.MEDIUM}
                name={"TableViewIcon"}
                className={clsx(allWaysPageSettings.view === View.Table && styles.activeView)}
              />
            </button>
          </Tooltip>
        </HorizontalContainer>
      </HorizontalContainer>

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

      <div className={styles.waysContent}>
        {allWaysPageSettings.view === View.Table ?
          <ScrollableBlock>
            <WaysTable
              data={allWays}
              columns={waysColumns}
            />
          </ScrollableBlock>
          :
          <HorizontalContainer className={styles.wayCards}>
            {allWays.map((way) => {
              return (
                <WayCard
                  key={way.uuid}
                  wayPreview={way}
                />
              );
            })
            }
          </HorizontalContainer>
        }
        {isMoreWaysExist &&
          <Button
            value="Load more"
            onClick={() => loadMoreWays(allWays)}
            buttonType={ButtonType.PRIMARY}
            className={styles.loadMoreButton}
          />
        }
      </div>
    </VerticalContainer>
  );
};
