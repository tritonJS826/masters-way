import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {getWayStatus} from "src/logic/waysTable/wayStatus";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/waysTable/columns.module.scss";

export const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's owner";
export const WAY_MENTORS = "Mentors";

/**
 * Get first name from username
 */
export const getFirstName = (userName: string) => {
  return userName.split(" ")[0];
};

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const waysColumns = [
  columnHelper.accessor("createdAt", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content="Date, when way was created"
      >
        Created at
      </Tooltip>
    </>),

    /**
     * Cell with date of created way
     */
    cell: ({row}) => (
      <span className={styles.dateCell}>
        {DateUtils.getShortISODateValue(row.original.createdAt)}
      </span>
    ),
  }),
  columnHelper.accessor("lastUpdate", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content="Date when the last Day Report was created"
        className={styles.tooltipFixed}
      >
        Last update
      </Tooltip>
    </>),

    /**
     * Cell with date of last updated way
     */
    cell: ({row}) => (
      <span className={styles.dateCell}>
        {DateUtils.getShortISODateValue(row.original.lastUpdate)}
      </span>
    ),
  }),
  columnHelper.accessor("status", {

    /**
     * Header
     */
    header: () => (
      <Tooltip
        position={PositionTooltip.TOP}
        content="The path is abandoned if it is not completed, but has not been edited in the last 14 days"
      >
        Status
      </Tooltip>
    ),

    /**
     * Cell with status value
     */
    cell: ({row}) => {
      const wayStatus = getWayStatus({
        status: row.original.status,
        lastUpdate: row.original.lastUpdate,
      });

      return (
        <div className={styles.status}>
          {wayStatus}
        </div>
      );
    },
  }),
  columnHelper.accessor("name", {

    /**
     * Header
     */
    header: () => (
      <Tooltip
        position={PositionTooltip.TOP}
        content="Way's name and goal"
      >
        Way
      </Tooltip>
    ),

    /**
     * Cell with clickable way name that leads to way page
     */
    cell: ({row}) => (
      <div>
        <Link path={pages.way.getPath({uuid: row.original.uuid})}>
          {row.original.name}
        </Link>
        <Tooltip content={renderMarkdown(row.original.goalDescription)}>
          <div className={styles.shortCell}>
            {renderMarkdown(row.original.goalDescription)}
          </div>
        </Tooltip>
      </div>
    ),
  }),
  columnHelper.accessor("owner", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content="Owner's name and email"
      >
        {WAYS_OWNER}
      </Tooltip>
    </>
    ),

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          <Link path={pages.user.getPath({uuid: row.original.owner.uuid})}>
            {row.original.owner.name}
          </Link>
          {row.original.owner.email}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("mentors", {

    /**
     * Header
     */
    header: () => (
      <Tooltip
        position={PositionTooltip.TOP}
        content="Links to way's mentors"
      >
        {WAY_MENTORS}
      </Tooltip>
    ),

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          {row.original.mentors.map((mentor) => (
            <Tooltip
              key={mentor.uuid}
              content={mentor.name}
              position={PositionTooltip.LEFT}
            >
              <Link path={pages.user.getPath({uuid: mentor.uuid})}>
                {getFirstName(mentor.name)}
              </Link>
            </Tooltip>
          ))}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("dayReportUuids", {

    /**
     * Header
     */
    header: () => (
      <>
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content="Amount of reports in the way"
        >
          Reports
        </Tooltip>
      </>),

    /**
     * Cell with amount of favorite for user uuids
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.dayReportUuids.length.toString()}
      </div>
    ),
  }),
  columnHelper.accessor("favoriteForUserUuids", {

    /**
     * Header
     */
    header: () => (
      <>
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content="Amount of favorites"
        >
          {Symbols.STAR}
        </Tooltip>
      </>),

    /**
     * Cell with amount of favorite for user uuids
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.favoriteForUserUuids.length.toString()}
      </div>
    ),
  }),
];
