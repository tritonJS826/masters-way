import {useState} from "react";
import clsx from "clsx";
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
// Import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
// Import {getWaysFilter} from "src/logic/waysTable/wayFilter";
import {getWaysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayStatus, WayStatusType} from "src/logic/waysTable/wayStatus";
import {WaysCollection} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LangauageService";
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
  wayUuids: string[];

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
  updateCollection?: (wayCollectionPartial: Partial<WaysCollection>) => Promise<void>;
}

export const FILTER_STATUS_ALL_VALUE = "all";

/**
 * Callback that is called to fetch data
 */
const loadWays = async (
  //TODO: fix it
  // wayUuids: string[],
  // filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
): Promise<WayPreview[]> => {
  // Const filter = getWaysFilter(filterStatus);
  // const waysPreview = await WayPreviewDAL.getWaysPreviewByUuids(Array.from(wayUuids), filter);
  const waysPreview: WayPreview[] = [];

  return waysPreview;
};

/**
 * Callback that is called to validate data
 */
const validateData = (data: WayPreview[]) => {
  return !!data;
};

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
export const BaseWaysTable = (props: BaseWaysTableProps) => {
  const {user, language} = useGlobalContext();
  const [ways, setWays] = useState<WayPreview[]>();

  /**
   * Filter ways by privacy
   */
  const getVisibleWays = (allWays: WayPreview[]) => allWays.filter((way) => isWayVisible(user?.uuid, way));

  useLoad(
    {

      /**
       * Load ways
       */
      // loadData: () => loadWays(props.wayUuids, props.filterStatus),
      loadData: () => loadWays(),
      validateData,
      onSuccess: setWays,

      /**
       * Error handler (in case of invalid data)
       */
      onError: (error: Error) => {
        throw error;
      },
      dependency: [props.filterStatus, props.wayUuids],
    },
  );

  if (!ways) {
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
        text={`${props.title} (${getVisibleWays(ways).length})`}
        level={HeadingLevel.h2}
      />

      <VerticalContainer className={styles.waysContent}>

        {props.view === View.Table ?
          <ScrollableBlock>
            <WaysTable
              data={getVisibleWays(ways)}
              columns={getWaysColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.wayCards}>
            {getVisibleWays(ways).map((way) => {
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
              props.wayUuids,
              getVisibleWays(ways).map(way => way.uuid),
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
                      props.updateCollection({wayUuids: props.wayUuids.filter(uuid => uuid !== notExistentWayUuid)});
                    }
                  }}
                  okText="Ok"
                />
              </>
            ))}
          </>
        )}

      </VerticalContainer>
    </>
  );
};
