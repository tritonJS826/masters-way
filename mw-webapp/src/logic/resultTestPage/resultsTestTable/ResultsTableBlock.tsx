import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {getResultsTestColumns} from "src/logic/resultTestPage/resultsTestTable/resultsTestColumns";
import {ResultsTestTable} from "src/logic/resultTestPage/resultsTestTable/ResultsTestTable";
import {QuestionResult} from "src/model/businessModel/QuestionResult";

/**
 * Results table props
 */
interface ResultsTableProps {

  /**
   * Question results
   */
  questionResults: QuestionResult[];
}

/**
 * Render table of tests result
 */
export const ResultsTableBlock = observer((props: ResultsTableProps) => {
  const {language} = languageStore;

  return (
    <ResultsTestTable
      data={props.questionResults}
      columns={getResultsTestColumns(language)}
    />
  );
});
