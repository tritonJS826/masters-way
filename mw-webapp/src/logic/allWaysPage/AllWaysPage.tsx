import {useState} from "react";
import {allWaysAccessIds} from "cypress/accessIds/allWaysAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
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
import {useDebounce} from "use-debounce";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

const DEFAULT_PAGE_PAGINATION_VALUE = 1;
const DEFAULT_MIN_DAY_REPORTS_AMOUNT = 5;
const DEBOUNCE_DELAY_MILLISECONDS = 1000;
const DEFAULT_ALL_WAYS_PAGE_SETTINGS: AllWaysPageSettings = {
  filterStatus: FILTER_STATUS_ALL_VALUE,
  minDayReportsAmount: DEFAULT_MIN_DAY_REPORTS_AMOUNT,
  view: View.Card,
  wayName: "",
};

/**
 * Safe opened tab from localStorage
 */
const allWaysPageSettingsValidator = (currentSettings: AllWaysPageSettings) => {
  return !!currentSettings.filterStatus && Number.isInteger(currentSettings.minDayReportsAmount);
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

  const [debouncedName] = useDebounce(allWaysPageSettings.wayName, DEBOUNCE_DELAY_MILLISECONDS);

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllWaysFetchData> => {
    setPagePagination(DEFAULT_PAGE_PAGINATION_VALUE);
    const ways = await WayDAL.getWays({
      page: DEFAULT_PAGE_PAGINATION_VALUE,
      status: allWaysPageSettings.filterStatus,
      minDayReportsAmount: allWaysPageSettings.minDayReportsAmount,
      wayName: allWaysPageSettings.wayName,
    });

    return {ways: ways.waysPreview, waysAmount: ways.size};
  };

  /**
   * Load more ways
   */
  const loadMoreWays = async (loadedWays: WayPreview[]) => {
    const nextPage = pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;

    const ways = await WayDAL.getWays({
      page: nextPage,
      status: allWaysPageSettings.filterStatus,
      minDayReportsAmount: allWaysPageSettings.minDayReportsAmount,
      wayName: allWaysPageSettings.wayName,
    });
    setAllWays([...loadedWays, ...ways.waysPreview]);
    setPagePagination(nextPage);
  };

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    // TODO #511: research how onError works in app and update onError (we need to get error on firebase statistics)
    displayNotification({text: error.message, type: NotificationType.ERROR});
    throw error;
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: AllWaysFetchData) => {
    setAllWays(data.ways);
    setAllWaysAmount(data.waysAmount);
    setPagePagination(DEFAULT_PAGE_PAGINATION_VALUE);
  };

  useLoad({
    loadData,
    onSuccess,
    onError,
    dependency: [debouncedName, allWaysPageSettings.filterStatus, allWaysPageSettings.minDayReportsAmount],
  });

  if (!allWays) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  return (
    <VerticalContainer className={styles.allWaysContainer}>
      <HorizontalContainer className={styles.filterView}>
        <HorizontalContainer className={styles.filterViewLeftPanel}>
          {/* TODO: fix: input should not be width: 100% by default as I understand */}
          <div>
            <Input
              value={allWaysPageSettings.wayName}
              onChange={(wayName: string) => {
                updateAllWaysPageSettings({
                  filterStatus: allWaysPageSettings.filterStatus,
                  view: allWaysPageSettings.view,
                  minDayReportsAmount: allWaysPageSettings.minDayReportsAmount,
                  wayName,
                });
              }}
              placeholder={LanguageService.allWays.filterBlock.wayNamePlaceholder[language]}
              typeInputIcon={"SearchIcon"}
              typeInput={InputType.Border}
            />
          </div>

          <Select
            label={LanguageService.allWays.filterBlock.type[language]}
            defaultValue={allWaysPageSettings.filterStatus}
            name="filterStatus"
            options={[
              {id: "1", value: FILTER_STATUS_ALL_VALUE, text: LanguageService.allWays.filterBlock.typeOptions.all[language]},
              {id: "2", value: WayStatus.completed, text: LanguageService.allWays.filterBlock.typeOptions.completed[language]},
              {id: "3", value: WayStatus.abandoned, text: LanguageService.allWays.filterBlock.typeOptions.abandoned[language]},
              {id: "4", value: WayStatus.inProgress, text: LanguageService.allWays.filterBlock.typeOptions.inProgress[language]},
            ]}
            onChange={(status) => {
              updateAllWaysPageSettings({
                filterStatus: status,
                view: allWaysPageSettings.view,
                minDayReportsAmount: allWaysPageSettings.minDayReportsAmount,
                wayName: allWaysPageSettings.wayName,
              });
              setPagePagination(DEFAULT_PAGE_PAGINATION_VALUE);
            }}
          />

          <Select
            cy={{dataCyTrigger: allWaysAccessIds.filterViewBlock.dayReportsSelect}}
            label={LanguageService.allWays.filterBlock.minDayReportsAmountLabel[language]}
            defaultValue={String(allWaysPageSettings.minDayReportsAmount)}
            name="minDayReportsStatus"
            options={[
              {
                id: "1",
                value: "0",
                text: LanguageService.allWays.filterBlock.minDayReportsAmountOption0[language],
                dataCy: allWaysAccessIds.filterViewBlock.dayReportsSelectOption0,
              },
              {
                id: "2",
                value: String(DEFAULT_ALL_WAYS_PAGE_SETTINGS.minDayReportsAmount),
                text: LanguageService.allWays.filterBlock.minDayReportsAmountOption1[language],
                dataCy: allWaysAccessIds.filterViewBlock.dayReportsSelectOptionAtLeast5,
              },
              {
                id: "3",
                value: "20",
                text: LanguageService.allWays.filterBlock.minDayReportsAmountOption2[language],
              },
              {
                id: "4",
                value: "50",
                text: LanguageService.allWays.filterBlock.minDayReportsAmountOption3[language],
              },
            ]}
            onChange={(minDayReportsAmount) => {
              updateAllWaysPageSettings({
                filterStatus: allWaysPageSettings.filterStatus,
                view: allWaysPageSettings.view,
                minDayReportsAmount: Number(minDayReportsAmount),
                wayName: allWaysPageSettings.wayName,
              });
              setPagePagination(DEFAULT_PAGE_PAGINATION_VALUE);
            }}
          />
        </HorizontalContainer>

        <ViewSwitcher
          view={allWaysPageSettings.view}
          setView={(view) => updateAllWaysPageSettings({
            filterStatus: allWaysPageSettings.filterStatus,
            view,
            minDayReportsAmount: allWaysPageSettings.minDayReportsAmount,
            wayName: allWaysPageSettings.wayName,
          })}
          options={[
            renderViewCardOption(LanguageService.common.view.cardViewTooltip[language]),
            renderViewTableOption(LanguageService.common.view.tableViewTooltip[language]),
          ]}
        />

      </HorizontalContainer>

      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.allWays.waysTable.leftTitle[language]} (${allWays.length})`}
          placeholder=""
          classNameHeading={styles.headingLevelH2}
          cy={{dataCyTitleContainer: allWaysAccessIds.allWaysTitles.title}}
        />
        <Title
          level={HeadingLevel.h2}
          classNameHeading={styles.headingLevelH2}
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
                  dataCy={allWaysAccessIds.allWaysTable.wayLink(way.name)}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
        {!!isMoreWaysExist &&
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
