import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {Language} from "src/utils/LanguageWorker";
import styles from "src/logic/usersTable/UserColumns.module.scss";

const columnHelper = createColumnHelper<UserPreview>();

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const getUsersColumns = (language: Language) => [
  columnHelper.accessor("name", {
    header: LanguageService.allUsers.usersTable.column.name[language],

    /**
     * Cell with clickable username that leads to user page
     */
    cell: ({row}) => (
      <Link path={pages.user.getPath({uuid: row.original.uuid})}>
        {row.original.name}
      </Link>
    ),
  }),
  columnHelper.accessor("email", {
    header: LanguageService.allUsers.usersTable.column.email[language],

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
    header: LanguageService.allUsers.usersTable.column.ownWays[language],

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
    header: LanguageService.allUsers.usersTable.column.favoriteWays[language],

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
    header: LanguageService.allUsers.usersTable.column.mentoringWays[language],

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
