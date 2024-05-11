import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayCard} from "src/component/wayCard/WayCard";
import {useGlobalContext} from "src/GlobalContext";
import {languageStore} from "src/globalStore/LanguageStore";
import {getWaysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayStatus, WayStatusType} from "src/logic/waysTable/wayStatus";
import {WayCollection} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LanguageService";
import {ArrayUtils} from "src/utils/ArrayUtils";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/waysTable/BaseWaysTable.module.scss";

/**
 * Favorite ways table props
 */
interface BaseWaysTableProps {

  /**
   * User's favorite ways preview
   */
  ways: WayPreview[];

  /**
   * Table title
   */
  title: string;

  /**
   * Filter status
   */
  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE;

  /**
   * Callback to change filter status
   */
  setFilterStatus: (status: WayStatusType | typeof FILTER_STATUS_ALL_VALUE) => void;

  /**
   * Way's view
   */
  view: View;

  /**
   * Callback to change view
   */
  setView: (view: View) => void;

  /**
   * Rename collection
   */
  updateCollection?: (wayCollectionPartial: Partial<WayCollection>) => Promise<void>;
}

export const FILTER_STATUS_ALL_VALUE = "all";

/**
 * TODO: #
 * It is workaround shoud be implemented on the backend
 */
export const isWayVisible = (userUuid: string|undefined, way: WayPreview) => {
  if (!userUuid) {
    return !way.isPrivate;
  }

  const isOwner = userUuid === way.owner.uuid;
  const isMentor = way.mentors.map((mentor) => mentor.uuid).includes(userUuid);

  return way.isPrivate ? (isOwner || isMentor) : true;
};

/**
 * Render table of favorite ways preview
 */
export const BaseWaysTable = observer((props: BaseWaysTableProps) => {
  const {user} = useGlobalContext();
  const {language} = languageStore;

  /**
   * Filter ways by privacy
   */
  const getVisibleWays = (
    allWays: WayPreview[],
    userUuid: string | undefined,
  ) => allWays.filter((way) => isWayVisible(userUuid, way));

  /**
   * Filter params
   */
  interface FiltersParams {

    /**
     * Ways fo filtering
     */
    allWays: WayPreview[];

    /**
     * Filter status value
     */
    filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE;
  }

  /**
   * Filter ways according status
   */
  const getFilteredWaysByStatus = (
    allWays: WayPreview[],
    filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
  ) => {

    return filterStatus === FILTER_STATUS_ALL_VALUE
      ? allWays
      : allWays.filter((way) => way.status === filterStatus);
  };

  /**
   * Filter ways by all filters and visibility
   */
  const getFilteredVisibleWays = (params: FiltersParams) => {
    const visibleWays = getVisibleWays(params.allWays, user?.uuid);
    const filteredByStatusWays = getFilteredWaysByStatus(visibleWays, params.filterStatus);

    return filteredByStatusWays;
  };

  if (!props.ways) {
    return (
      <VerticalContainer className={styles.loaderWrapper}>
        <Loader />
      </VerticalContainer>
    );
  }

  /**
   * Check is filters for collection used
   */
  const getIsNoFilters = () => props.filterStatus === FILTER_STATUS_ALL_VALUE;

  return (
    <>
      <HorizontalContainer className={styles.wayCollectionActions}>
        <HorizontalContainer className={styles.filterView}>
          <Select
            label={`${LanguageService.user.filterBlock.type[language]}:`}
            defaultValue={props.filterStatus}
            name="filterStatus"
            options={[
              {id: "1", value: FILTER_STATUS_ALL_VALUE, text: LanguageService.user.filterBlock.typeOptions.all[language]},
              {id: "2", value: WayStatus.completed, text: LanguageService.user.filterBlock.typeOptions.completed[language]},
              {id: "3", value: WayStatus.abandoned, text: LanguageService.user.filterBlock.typeOptions.abandoned[language]},
              {id: "4", value: WayStatus.inProgress, text: LanguageService.user.filterBlock.typeOptions.inProgress[language]},
            ]}
            onChange={(value) => props.setFilterStatus(value as WayStatusType)}
          />

          <HorizontalContainer>
            <Tooltip
              position={PositionTooltip.LEFT}
              content={LanguageService.user.filterBlock.cardViewTooltip[language]}
            >
              <button
                className={styles.iconView}
                onClick={() => props.setView(View.Card)}
              >
                <Icon
                  size={IconSize.MEDIUM}
                  name={"GridViewIcon"}
                  className={clsx(props.view === View.Card && styles.activeView)}
                />
              </button>
            </Tooltip>
            <Tooltip
              position={PositionTooltip.LEFT}
              content={LanguageService.user.filterBlock.tableViewTooltip[language]}
            >
              <button
                className={styles.iconView}
                onClick={() => props.setView(View.Table)}
              >
                <Icon
                  size={IconSize.MEDIUM}
                  name={"TableViewIcon"}
                  className={clsx(props.view === View.Table && styles.activeView)}
                />
              </button>
            </Tooltip>
          </HorizontalContainer>
        </HorizontalContainer>
      </HorizontalContainer>

      <Title
        text={`${props.title} (${getFilteredVisibleWays({
          allWays: props.ways,
          filterStatus: props.filterStatus,
        }).length})`}
        level={HeadingLevel.h2}
      />

      <VerticalContainer className={styles.waysContent}>

        {props.view === View.Table ?
          <ScrollableBlock>
            <WaysTable
              data={getFilteredVisibleWays({
                allWays: props.ways,
                filterStatus: props.filterStatus,
              })}
              columns={getWaysColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.wayCards}>
            {getFilteredVisibleWays({
              allWays: props.ways,
              filterStatus: props.filterStatus,
            }).map((way) => {
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

        {props.updateCollection && getIsNoFilters() && (
          <>
            {ArrayUtils.getDifference(
              props.ways.map(way => way.uuid),
              getVisibleWays(props.ways, user?.uuid).map(way => way.uuid),
            ).map((notExistentWayUuid) => (
              <>
                <Confirm
                  trigger={
                    // TODO: #480 make normal element for suggestions
                    <Button
                      value={`Way with uuid "${notExistentWayUuid}" is was removed or hidden. Remove it from the collection?`}
                      onClick={() => {}}
                      buttonType={ButtonType.SECONDARY}
                      className={styles.button}
                    />
                  }
                  content={<p>
                    {`Are you sure you want the way "${notExistentWayUuid}" from the collection?`}
                  </p>}
                  onOk={() => {
                    if (props.updateCollection) {
                      props.updateCollection(
                        {wayUuids: props.ways.map(way => way.uuid).filter(uuid => uuid !== notExistentWayUuid)});
                    }
                  }}
                  okText={LanguageService.modals.confirmModal.okButton[language]}
                  cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                />
              </>
            ))}
          </>
        )}

      </VerticalContainer>
    </>
  );
});
