import {createColumnHelper} from "@tanstack/react-table";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {wayStatusConverter} from "src/logic/waysTable/wayStatus";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {DateUtils} from "src/utils/DateUtils";
import {Language} from "src/utils/LanguageWorker";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/waysTable/columns.module.scss";

export const columnHelper = createColumnHelper<WayPreview>();

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
export const getWaysColumns = (language: Language) => [
  columnHelper.accessor("createdAt", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content={LanguageService.allWays.waysTable.columnTooltip.createdAt[language]}
      >
        {LanguageService.allWays.waysTable.columns.createdAt[language]}
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
        content={LanguageService.allWays.waysTable.columnTooltip.lastUpdate[language]}
        className={styles.tooltipFixed}
      >
        {LanguageService.allWays.waysTable.columns.lastUpdate[language]}
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
        content={LanguageService.allWays.waysTable.columnTooltip.status[language]}
      >
        {LanguageService.allWays.waysTable.columns.status[language]}
      </Tooltip>
    ),

    /**
     * Cell with status value
     */
    cell: ({row}) => {
      const wayStatus = wayStatusConverter({
        status: row.original.status,
        language,
      });

      return (
        <div className={styles.status}>
          {wayStatus}
          <ProgressBar
            value={row.original.metricsDone}
            max={row.original.metricsTotal}
          />
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
        content={LanguageService.allWays.waysTable.columnTooltip.way[language]}
      >
        {LanguageService.allWays.waysTable.columns.way[language]}
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
        <Tooltip
          content={renderMarkdown(row.original.goalDescription)}
          position={PositionTooltip.BOTTOM}
        >
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
        content={LanguageService.allWays.waysTable.columnTooltip.owner[language]}
      >
        {LanguageService.allWays.waysTable.columns.owner[language]}
      </Tooltip>
    </>
    ),

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <HorizontalContainer className={styles.userBlock}>
          <Avatar
            alt={row.original.owner.name}
            src={row.original.owner.imageUrl}
            size={AvatarSize.MEDIUM}
          />
          <VerticalContainer>
            <Link path={pages.user.getPath({uuid: row.original.owner.uuid})}>
              {row.original.owner.name}
            </Link>
            {row.original.owner.email}
          </VerticalContainer>
        </HorizontalContainer>
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
        content={LanguageService.allWays.waysTable.columnTooltip.mentor[language]}
      >
        {LanguageService.allWays.waysTable.columns.mentor[language]}
      </Tooltip>
    ),

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          {row.original.mentors.map((mentor) => (
            <HorizontalContainer
              key={mentor.uuid}
              className={styles.userBlock}
            >
              <Avatar
                alt={mentor.name}
                src={mentor.imageUrl}
                size={AvatarSize.MEDIUM}
              />
              <Tooltip
                content={mentor.name}
                position={PositionTooltip.LEFT}
              >
                <Link path={pages.user.getPath({uuid: mentor.uuid})}>
                  {mentor.name}
                </Link>
              </Tooltip>
            </HorizontalContainer>
          ))}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("dayReportsAmount", {

    /**
     * Header
     */
    header: () => (
      <>
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content={LanguageService.allWays.waysTable.columnTooltip.reports[language]}
        >
          {LanguageService.allWays.waysTable.columns.reports[language]}
        </Tooltip>
      </>),

    /**
     * Cell with amount of favorite for user uuids
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.dayReportsAmount}
      </div>
    ),
  }),
  columnHelper.accessor("favoriteForUsers", {

    /**
     * Header
     */
    header: () => (
      <>
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content={LanguageService.allWays.waysTable.columnTooltip.favorites[language]}
        >
          {Symbols.STAR}
        </Tooltip>
      </>),

    /**
     * Cell with amount of favorite for user uuids
     */
    cell: ({row}) => (
      <div className={styles.number}>
        {row.original.favoriteForUsers}
      </div>
    ),
  }),
];
