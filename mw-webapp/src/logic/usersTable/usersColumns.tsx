import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/usersTable/UserColumns.module.scss";

const columnHelper = createColumnHelper<UserPreview>();

export const USERS_NAME = "User's name";
export const USERS_EMAIL = "User's email";
export const OWN_WAYS = "User's own Ways";
export const FAVORITE_WAYS = "User's favorite Ways";
export const MENTORING_WAYS = "User's mentoring Ways";

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const usersColumns = [
  columnHelper.accessor("name", {

    /**
     * Header
     */
    header: () => (<Tooltip content={USERS_NAME}>
      Name
    </Tooltip>),

    /**
     * Cell with clickable username that leads to user page
     */
    cell: ({row}) => (
      <Link path={pages.user.getPath({uuid: row.original.uuid})}>
        <Tooltip
          position={PositionTooltip.TOP}
          content={row.original.name}
        >
          {row.original.name}
        </Tooltip>
      </Link>
    ),
  }),
  columnHelper.accessor("email", {

    /**
     * Header
     */
    header: () => (<Tooltip content={USERS_EMAIL}>
      Email
    </Tooltip>),

    /**
     * Cell user email
     */
    cell: ({row}) => (
      <Tooltip
        position={PositionTooltip.TOP}
        content={row.original.email}
      >
        {row.original.email}
      </Tooltip>
    ),
  }),
  columnHelper.accessor("ownWays", {

    /**
     * Header
     */
    header: () => (<Tooltip content={OWN_WAYS}>
      Own Ways
    </Tooltip>),

    /**
     * Cell with user's own ways
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.ownWays.length.toString()}
      </div>
    ),
  }),
  columnHelper.accessor("favoriteWays", {

    /**
     * Header
     */
    header: () => (<Tooltip content={FAVORITE_WAYS}>
      Favorite Ways
    </Tooltip>),

    /**
     * Cell with user's favorite ways
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.favoriteWays.length.toString()}
      </div>
    ),
  }),
  columnHelper.accessor("mentoringWays", {

    /**
     * Header
     */
    header: () => (<Tooltip content={MENTORING_WAYS}>
      Mentoring Ways
    </Tooltip>),

    /**
     * Cell with user's mentoring ways
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.mentoringWays.length.toString()}
      </div>
    ),
  }),
];
