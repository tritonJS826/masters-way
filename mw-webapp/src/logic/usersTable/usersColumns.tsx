import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/usersTable/UserColumns.module.scss";

const columnHelper = createColumnHelper<UserPreview>();

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const usersColumns = [
  columnHelper.accessor("name", {
    header: "Name",

    /**
     * Cell with clickable username that leads to user page
     */
    cell: ({row}) => (
      <Link
        path={pages.user.getPath({uuid: row.original.uuid})}
        value={row.original.name}
      />
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",

    /**
     * Cell user email
     */
    cell: ({row}) => (
      <span>
        {row.original.email}
      </span>
    ),
  }),
  columnHelper.accessor("ownWays", {
    header: "Own Ways",

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
    header: "Favorite Ways",

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
    header: "Mentoring Ways",

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
