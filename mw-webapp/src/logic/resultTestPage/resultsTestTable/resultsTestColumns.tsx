import {createColumnHelper} from "@tanstack/react-table";
import clsx from "clsx";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/resultTestPage/resultsTestTable/columns.module.scss";

export const columnHelper = createColumnHelper<QuestionResult>();

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const getResultsTestColumns = (language: Language) => [

  columnHelper.accessor("questionName", {

    /**
     * Header
     */
    header: () => (<>
      {LanguageService.resultTest.resultTable.column.question[language]}
    </>),

    /**
     * Cell with question name
     */
    cell: ({row}) => (
      <VerticalContainer className={styles.cellWrapper}>
        {renderMarkdown(row.original.questionName)}
      </VerticalContainer>
    ),
  }),
  columnHelper.accessor("questionDescription", {

    /**
     * Header
     */
    header: () => (<>
      {LanguageService.resultTest.resultTable.column.description[language]}
    </>
    ),

    /**
     * Cell with question description
     */
    cell: ({row}) => {
      return (
        <VerticalContainer className={styles.cellWrapper}>
          {renderMarkdown(row.original.questionDescription)}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("questionAnswer", {

    /**
     * Header
     */
    header: () => (<>
      {LanguageService.resultTest.resultTable.column.rightAnswer[language]}
    </>
    ),

    /**
     * Cell with right answer
     */
    cell: ({row}) => (
      <VerticalContainer className={styles.cellWrapper}>
        {renderMarkdown(row.original.questionAnswer)}
      </VerticalContainer>
    ),
  }),
  columnHelper.accessor("userAnswer", {

    /**
     * Header
     */
    header: () => (<>
      {LanguageService.resultTest.resultTable.column.userAnswer[language]}
    </>
    ),

    /**
     * Cell with user's answer
     */
    cell: ({row}) => (
      <VerticalContainer className={styles.cellWrapper}>
        {renderMarkdown(row.original.userAnswer)}
      </VerticalContainer>
    ),
  }),
  columnHelper.accessor("isOk", {

    /**
     * Header
     */
    header: () => (<>
      {LanguageService.resultTest.resultTable.column.isOk[language]}
    </>
    ),

    /**
     * Cell with user's answer
     */
    cell: ({row}) => (
      <HorizontalContainer className={clsx(
        styles.cellWrapper,
        styles.iconCell,
      )}
      >
        <Link
          path={pages.user.getPath({uuid: row.original.userUuid})}
          className={styles.userAvatar}
        >
          <Tooltip
            key={row.original.userUuid}
            position={PositionTooltip.TOP}
            content={row.original.userName}
          >
            <Avatar
              alt={row.original.userUuid}
              src={row.original.userImageUrl}
              size={AvatarSize.SMALL}
            />
          </Tooltip>
        </Link>
        <Icon
          size={IconSize.MEDIUM}
          name={row.original.isOk ? "CheckIcon" : "RemoveIcon"}
          className={clsx(row.original.isOk ? styles.answerIsOk : styles.answerIsWrong)}
        />
      </HorizontalContainer>
    ),
  }),
  columnHelper.accessor("resultDescription", {

    /**
     * Header
     */
    header: () => (<>
      {LanguageService.resultTest.resultTable.column.aiComment[language]}
    </>
    ),

    /**
     * Cell with user's answer
     */
    cell: ({row}) => (
      <VerticalContainer className={styles.cellWrapper}>
        {renderMarkdown(row.original.resultDescription)}
      </VerticalContainer>
    ),
  }),
];
