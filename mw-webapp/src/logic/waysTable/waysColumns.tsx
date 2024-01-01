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
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/logic/waysTable/columns.module.scss";

export const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's Owner";
export const WAY_MENTORS = "Mentors";

/**
 * Get first name from user name
 */
const getFirstName = (userName: string) => {
  const firstName = userName.split(" ")[0];

  return firstName;
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
        position={PositionTooltip.BOTTOM}
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
        position={PositionTooltip.BOTTOM}
        content="Date when the last Day Report was created"
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
  columnHelper.accessor("isCompleted", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.BOTTOM}
        content="The path is abandoned if it is not completed, but has not been edited in the last 14 days"
      >
        Status
      </Tooltip>
    </>),

    /**
     * Cell with isCompleted value
     */
    cell: ({row}) => {
      const wayStatus = getWayStatus({
        isCompleted: row.original.isCompleted,
        lastUpdate: row.original.lastUpdate,
      });

      return (
        <div>
          {wayStatus}
        </div>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Way",

    /**
     * Cell with clickable way name that leads to way page
     */
    cell: ({row}) => (
      <div>
        <Link
          path={pages.way.getPath({uuid: row.original.uuid})}
          value={row.original.name}
        />
        <Tooltip
          className={styles.tooltip}
          content={renderMarkdown(row.original.goal.description)}
        >
          <div className={styles.shortCell}>
            {renderMarkdown(row.original.goal.description)}
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
        position={PositionTooltip.BOTTOM}
        content="Name and email of user, who created the Way"
      >
        {WAYS_OWNER}
      </Tooltip>
    </>),

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          <Link
            path={pages.user.getPath({uuid: row.original.owner.uuid})}
            value={row.original.owner.name}
          />
          {row.original.owner.email}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("mentors", {
    header: WAY_MENTORS,

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
            >
              <Link
                path={pages.user.getPath({uuid: mentor.uuid})}
                value={getFirstName(mentor.name)}
              />
            </Tooltip>
          ))}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("favoriteForUserUuids", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.BOTTOM}
        content="Amount of favorites"
      >
        {UnicodeSymbols.STAR}
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
