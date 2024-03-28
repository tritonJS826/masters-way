import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {Language} from "src/utils/LanguageWorker";
import styles from "src/logic/usersTable/UserColumns.module.scss";

const columnHelper = createColumnHelper<UserNotSaturatedWay>();

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const getUsersColumns = (language: Language) => [
  columnHelper.accessor("name", {

    /**
     * Header
     */
    header: () => (
      <Tooltip content={
        LanguageService.allUsers.usersTable.columnTooltip.name[language]
      }
      >
        {LanguageService.allUsers.usersTable.column.name[language]}
      </Tooltip>
    ),

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
    header: () => (
      <Tooltip content={LanguageService.allUsers.usersTable.columnTooltip.email[language]}>
        {LanguageService.allUsers.usersTable.column.email[language]}
      </Tooltip>
    ),

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
    header: () => (
      <Tooltip content={
        LanguageService.allUsers.usersTable.columnTooltip.ownWays[language]
      }
      >
        {LanguageService.allUsers.usersTable.column.ownWays[language]}
      </Tooltip>
    ),

    /**
     * Cell with user's own ways
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.ownWays.toString()}
      </div>
    ),
  }),
  columnHelper.accessor("favoriteWays", {

    /**
     * Header
     */
    header: () => (
      <Tooltip content={
        LanguageService.allUsers.usersTable.columnTooltip.favoriteWays[
          language
        ]
      }
      >
        {LanguageService.allUsers.usersTable.column.favoriteWays[language]}
      </Tooltip>
    ),

    /**
     * Cell with user's favorite ways
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.favoriteWays.toString()}
      </div>
    ),
  }),
  columnHelper.accessor("mentoringWays", {

    /**
     * Header
     */
    header: () => (
      <Tooltip content={
        LanguageService.allUsers.usersTable.columnTooltip.mentoringWays[
          language
        ]
      }
      >
        {LanguageService.allUsers.usersTable.column.mentoringWays[language]}
      </Tooltip>
    ),

    /**
     * Cell with user's mentoring ways
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.mentoringWays.toString()}
      </div>
    ),
  }),
];
