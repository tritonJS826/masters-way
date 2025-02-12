import {createColumnHelper} from "@tanstack/react-table";
import clsx from "clsx";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/trainingsTable/TrainingsColumns.module.scss";

export const columnHelper = createColumnHelper<TrainingPreview>();

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
export const getTrainingsColumns = (language: Language) => [
  columnHelper.accessor("createdAt", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content={LanguageService.allTrainings.trainingsTable.columnTooltip.createdAt[language]}
      >
        {LanguageService.allTrainings.trainingsTable.columns.createdAt[language]}
      </Tooltip>
    </>),

    /**
     * Cell with date of created training
     */
    cell: ({row}) => {
      return (
        <span className={clsx(
          styles.cellWrapper,
          styles.dateCell,
        )}
        >
          {DateUtils.getShortISODateValue(row.original.createdAt)}
        </span>
      );
    },
  }),
  columnHelper.accessor("updatedAt", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content={LanguageService.allTrainings.trainingsTable.columnTooltip.lastUpdate[language]}
        className={styles.tooltipFixed}
      >
        {LanguageService.allTrainings.trainingsTable.columns.lastUpdate[language]}
      </Tooltip>
    </>),

    /**
     * Cell with date of last updated training
     */
    cell: ({row}) => (
      <span className={clsx(
        styles.cellWrapper,
        styles.dateCell,
      )}
      >
        {DateUtils.getShortISODateValue(row.original.updatedAt)}
      </span>
    ),
  }),
  columnHelper.accessor("name", {

    /**
     * Header
     */
    header: () => (
      <Tooltip
        position={PositionTooltip.TOP}
        content={LanguageService.allTrainings.trainingsTable.columnTooltip.training[language]}
      >
        {LanguageService.allTrainings.trainingsTable.columns.training[language]}
      </Tooltip>
    ),

    /**
     * Cell with clickable training name that leads to training page
     */
    cell: ({row}) => (
      <VerticalContainer className={clsx(
        styles.cellWrapper,
      )}
      >
        <Link path={pages.training.getPath({uuid: row.original.uuid})}>
          {row.original.name}
        </Link>
        <Tooltip
          content={renderMarkdown(row.original.description)}
          position={PositionTooltip.BOTTOM}
        >
          <div className={styles.shortCell}>
            {renderMarkdown(row.original.description)}
          </div>
        </Tooltip>
      </VerticalContainer>
    ),
  }),
  columnHelper.accessor("owner", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content={LanguageService.allTrainings.trainingsTable.columnTooltip.owner[language]}
      >
        {LanguageService.allTrainings.trainingsTable.columns.owner[language]}
      </Tooltip>
    </>
    ),

    /**
     * Cell with training's owner
     */
    cell: ({row}) => {
      return (
        <HorizontalContainer className={clsx(
          styles.cellWrapper,
          styles.userBlock,
        )}
        >
          <Avatar
            alt={row.original.owner.name}
            src={row.original.owner.imageUrl}
            size={AvatarSize.MEDIUM}
          />
          <VerticalContainer>
            <Link path={pages.user.getPath({uuid: row.original.owner.uuid})}>
              {row.original.owner.name}
            </Link>
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
        content={LanguageService.allTrainings.trainingsTable.columnTooltip.mentor[language]}
      >
        {LanguageService.allTrainings.trainingsTable.columns.mentor[language]}
      </Tooltip>
    ),

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        <VerticalContainer className={clsx(
          styles.cellWrapper,
          styles.userBlock,
        )}
        >
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
  columnHelper.accessor("favoriteForUsersAmount", {

    /**
     * Header
     */
    header: () => (
      <>
        <Tooltip
          position={PositionTooltip.TOP}
          content={LanguageService.allTrainings.trainingsTable.columnTooltip.favorites[language]}
        >
          {Symbols.STAR}
        </Tooltip>
      </>),

    /**
     * Cell with amount of favorite for user uuids
     */
    cell: ({row}) => (
      <div className={clsx(
        styles.cellWrapper,
        styles.number,
      )}
      >
        {row.original.favoriteForUsersAmount}
      </div>
    ),
  }),
];
