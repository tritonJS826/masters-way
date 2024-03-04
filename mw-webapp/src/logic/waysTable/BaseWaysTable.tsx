import {useState} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayCard} from "src/component/wayCard/WayCard";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {getWaysFilter} from "src/logic/waysTable/wayFilter";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayStatus, WayStatusType} from "src/logic/waysTable/wayStatus";
import {WaysCollection} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
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
  wayUuids: string[],
  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
): Promise<WayPreview[]> => {
  const filter = getWaysFilter(filterStatus);
  const waysPreview = await WayPreviewDAL.getWaysPreviewByUuids(Array.from(wayUuids), filter);

  return waysPreview;
};

/**
 * Callback that is called to validate data
 */
const validateData = (data: WayPreview[]) => {
  return !!data;
};

/**
 * Render table of favorite ways preview
 */
export const BaseWaysTable = (props: BaseWaysTableProps) => {
  const [ways, setWays] = useState<WayPreview[]>();

  useLoad(
    {

      /**
       * Load ways
       */
      loadData: () => loadWays(props.wayUuids, props.filterStatus),
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
            label="Show only: "
            value={props.filterStatus}
            name="filterStatus"
            options={[
              {id: "1", value: FILTER_STATUS_ALL_VALUE, text: "All"},
              {id: "2", value: WayStatus.Completed, text: "Completed"},
              {id: "3", value: WayStatus.Abandoned, text: "Abandoned"},
              {id: "4", value: WayStatus.InProgress, text: "InProgress"},
            ]}
            onChange={(value) => props.setFilterStatus(value as WayStatusType)}
          />

          <HorizontalContainer className={styles.iconsView}>
            <Tooltip
              position={PositionTooltip.LEFT}
              content={`Switch to ${View.Card} view`}
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
              content={`Switch to ${View.Table} view`}
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
        text={`${props.title} (${ways.length})`}
        level={HeadingLevel.h2}
      />
      <div className={styles.waysContent}>
        {props.view === View.Table ?
          <WaysTable
            data={ways}
            columns={waysColumns}
          />
          :
          <HorizontalContainer className={styles.wayCards}>
            {ways.map((way) => {
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
      </div>

      {props.updateCollection && getIsNoFilters() && (
        <>
          {ArrayUtils.getDifference(
            props.wayUuids,
            ways.map(way => way.uuid),
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
    </>
  );
};
