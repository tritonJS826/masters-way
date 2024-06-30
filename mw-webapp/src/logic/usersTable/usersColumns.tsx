import {createColumnHelper} from "@tanstack/react-table";
import clsx from "clsx";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Language} from "src/globalStore/LanguageStore";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {Symbols} from "src/utils/Symbols";
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
      <HorizontalContainer className={clsx(styles.cellWrapper, styles.userBlock)}>
        <Avatar
          alt={row.original.name}
          src={row.original.imageUrl}
          size={AvatarSize.SMALL}
        />
        <Link path={pages.user.getPath({uuid: row.original.uuid})}>
          <Tooltip
            position={PositionTooltip.TOP}
            content={row.original.name}
          >
            {row.original.name}
          </Tooltip>
        </Link>
      </HorizontalContainer>
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
      <div className={styles.cellWrapper}>
        <Tooltip
          position={PositionTooltip.TOP}
          content={row.original.email}
        >
          {row.original.email}
        </Tooltip>
      </div>
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
      <div className={clsx(styles.cellWrapper, styles.number)}>
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
      <div className={clsx(styles.cellWrapper, styles.number)}>
        {row.original.favoriteWays}
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
      <div className={clsx(styles.cellWrapper, styles.number)}>
        {row.original.mentoringWays.toString()}
      </div>
    ),
  }),
  columnHelper.accessor("favoriteForUsers", {

    /**
     * Header
     */
    header: () => (
      <>
        <Tooltip content={LanguageService.allUsers.usersTable.columnTooltip.favorites[language]}>
          {Symbols.STAR}
        </Tooltip>
      </>),

    /**
     * Cell with amount of favorite for user uuids
     */
    cell: ({row}) => (
      <div className={clsx(styles.cellWrapper, styles.number)}>
        {row.original.favoriteForUsers}
      </div>
    ),
  }),
];
