import {createColumnHelper} from "@tanstack/react-table";
import clsx from "clsx";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
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
      {"Question name"}
      {/* {LanguageService.allWays.waysTable.columns.lastUpdate[language]} */}
    </>),

    /**
     * Cell with date of last updated way
     */
    cell: ({row}) => (
      <span className={clsx(
        styles.cellWrapper,
      )}
      >
        {row.original.questionUuid}
      </span>
    ),
  }),
  columnHelper.accessor("questionUuid", {

    /**
     * Header
     */
    header: () => (<>
      {"question answer"}
    </>
      // {LanguageService.allWays.waysTable.columns.status[language]}
    ),

    /**
     * Cell with status value
     */
    cell: ({row}) => {
      return (
        <VerticalContainer className={clsx(
          styles.cellWrapper,
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
    header: () => (
      <>
        {"Is ok"}
      </>
      // {LanguageService.allWays.waysTable.columns.way[language]}
    ),

    /**
     * Cell with clickable way name that leads to way page
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
      {"Result description"}
      {/* {LanguageService.allWays.waysTable.columns.owner[language]} */}
    </>
    ),

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <>
          {row.original.resultDescription}
        </>
      );
    },
  }),
];
