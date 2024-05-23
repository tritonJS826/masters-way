import {useState} from "react";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
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
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {getWaysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LanguageService";
import {AllWaysPageSettings, View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

const DEFAULT_PAGE_PAGINATION_VALUE = 1;
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
export const AllWaysPage = observer(() => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const [allWays, setAllWays] = useState<WayPreview[]>();
  const [allWaysAmount, setAllWaysAmount] = useState<number>();
  const [pagePagination, setPagePagination] = useState<number>(DEFAULT_PAGE_PAGINATION_VALUE);

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

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllWaysFetchData> => {
    const ways = await WayDAL.getWays({page: pagePagination, status: allWaysPageSettings.filterStatus});
    const nextPage = pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;
    setPagePagination(nextPage);

    return {ways: ways.waysPreview, waysAmount: ways.size};
  };

  /**
   * Load more ways
   */
  const loadMoreWays = async (loadedWays: WayPreview[]) => {
    const nextPage = pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;
    setPagePagination(nextPage);

    const ways = await WayDAL.getWays({page: pagePagination, status: allWaysPageSettings.filterStatus});
    setAllWays([...loadedWays, ...ways.waysPreview]);
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
      <Loader theme={theme} />
    );
  }

  return (
    <VerticalContainer className={styles.allWaysContainer}>
      <HorizontalContainer className={styles.filterView}>
        <Select
          label={`${LanguageService.allWays.filterBlock.type[language]}:`}
          defaultValue={allWaysPageSettings.filterStatus}
          name="filterStatus"
          options={[
            {id: "1", value: FILTER_STATUS_ALL_VALUE, text: LanguageService.allWays.filterBlock.typeOptions.all[language]},
            {id: "2", value: WayStatus.completed, text: LanguageService.allWays.filterBlock.typeOptions.completed[language]},
            {id: "3", value: WayStatus.abandoned, text: LanguageService.allWays.filterBlock.typeOptions.abandoned[language]},
            {id: "4", value: WayStatus.inProgress, text: LanguageService.allWays.filterBlock.typeOptions.inProgress[language]},
          ]}
          onChange={(value) => {
            updateAllWaysPageSettings({filterStatus: value, view: allWaysPageSettings.view});
            setPagePagination(DEFAULT_PAGE_PAGINATION_VALUE);
          }}
        />

        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.LEFT}
            content={LanguageService.allWays.filterBlock.cardViewTooltip[language]}
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
            content={LanguageService.allWays.filterBlock.tableViewTooltip[language]}
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
          text={`${LanguageService.allWays.waysTable.leftTitle[language]} (${allWays.length})`}
          placeholder=""
        />
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.allWays.waysTable.rightTitle[language]}: ${allWaysAmount}`}
          placeholder=""
        />
      </HorizontalContainer>

      <div className={styles.waysContent}>
        {allWaysPageSettings.view === View.Table ?
          <ScrollableBlock>
            <WaysTable
              data={allWays}
              columns={getWaysColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.wayCards}>
            {allWays.map((way) => {
              return (
                <WayCard
                  key={way.uuid}
                  wayPreview={way}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
        {isMoreWaysExist &&
          <Button
            value={LanguageService.allWays.waysTable.loadMoreButton[language]}
            onClick={() => loadMoreWays(allWays)}
            buttonType={ButtonType.SECONDARY}
            className={styles.loadMoreButton}
          />
        }
      </div>
    </VerticalContainer>
  );
});
