import {createColumnHelper} from "@tanstack/react-table";
import clsx from "clsx";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/testsTable/TestsColumns.module.scss";

export const columnHelper = createColumnHelper<TestPreview>();

/**
 * Get first name from username
 */
export const getFirstName = (userName: string) => {
  return userName.split(" ")[0];
};

/**
 * Tests table columns
 */
export const getTestsColumns = (language: Language) => [
  columnHelper.accessor("createdAt", {

    /**
     * Header
     */
    header: () => (<>
      <Tooltip
        position={PositionTooltip.TOP}
        content={LanguageService.allTests.testsTable.columnTooltip.createdAt[language]}
      >
        {LanguageService.allTests.testsTable.columns.createdAt[language]}
      </Tooltip>
    </>),

    /**
     * Cell with date of created test
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
        content={LanguageService.allTests.testsTable.columnTooltip.lastUpdate[language]}
        className={styles.tooltipFixed}
      >
        {LanguageService.allTests.testsTable.columns.lastUpdate[language]}
      </Tooltip>
    </>),

    /**
     * Cell with date of last updated test
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
        content={LanguageService.allTests.testsTable.columnTooltip.test[language]}
      >
        {LanguageService.allTests.testsTable.columns.test[language]}
      </Tooltip>
    ),

    /**
     * Cell with clickable test name that leads to test page
     */
    cell: ({row}) => (
      <VerticalContainer className={clsx(
        styles.cellWrapper,
      )}
      >
        <Link path={pages.test.getPath({uuid: row.original.uuid})}>
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
        content={LanguageService.allTests.testsTable.columnTooltip.owner[language]}
      >
        {LanguageService.allTests.testsTable.columns.owner[language]}
      </Tooltip>
    </>
    ),

    /**
     * Cell with test's owner
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
];
