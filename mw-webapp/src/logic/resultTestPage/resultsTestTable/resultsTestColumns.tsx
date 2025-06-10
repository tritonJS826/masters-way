import {createColumnHelper} from "@tanstack/react-table";
import clsx from "clsx";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/resultTestPage/resultsTestTable/columns.module.scss";

export const columnHelper = createColumnHelper<QuestionResult>();

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const getResultsTestColumns = (language: Language) => [

  columnHelper.accessor("questionUuid", {

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
      <VerticalContainer className={clsx(
        styles.cellWrapper,
        row.original.isOk ? styles.compositeWay : styles.abandonedWay,
      )}
      >
        {row.original.questionUuid}
      </VerticalContainer>
    ),
  }),
  columnHelper.accessor("questionUuid", {

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
        <VerticalContainer className={clsx(
          styles.cellWrapper,
          row.original.isOk ? styles.compositeWay : styles.abandonedWay,
        )}
        >
          {row.original.questionUuid}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("isOk", {

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
      <VerticalContainer className={clsx(
        styles.cellWrapper,
        row.original.isOk ? styles.compositeWay : styles.abandonedWay,
      )}
      >

        {row.original.isOk}
      </VerticalContainer>
    ),
  }),
  columnHelper.accessor("resultDescription", {

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
      <VerticalContainer className={clsx(
        styles.cellWrapper,
        row.original.isOk ? styles.compositeWay : styles.abandonedWay,
      )}
      >

        {row.original.isOk}
      </VerticalContainer>
    ),
  }),
];
