import {Content, ContentText, TDocumentDefinitions} from "pdfmake/interfaces";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {Language} from "src/globalStore/LanguageStore";
import {ResultsParams} from "src/logic/resultTestPage/ResultTestPageStore";
import {QuestionResultProps} from "src/model/businessModel/QuestionResult";
import {LanguageService} from "src/service/LanguageService";
import {convertAsterisksToOrderedList} from "src/utils/convertAsterisksToOrderedList";
import {DateUtils} from "src/utils/DateUtils";
import {LazyLoader} from "src/utils/lazyLoader";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 20;

const RESULT = {
  RIGHT: "Right",
  WRONG: "Wrong",
};

/**
 * Get test name
 */
const getTestName = async (testId: string): Promise<Content> => {
  const test = await TestDAL.getTest(testId);

  return {
    text: test.name,
    style: "header",
    bold: true,
    fontSize: 20,
    alignment: "center",
  };
};

/**
 * Render createdAt dates
 */
const getCompletedAt = (createdAt: Date): ContentText =>
  ({text: `Test is completed at ${DateUtils.getShortISODateValue(createdAt)}`});

/**
 * Render description
 */
const getDescription = (description: string): ContentText => ({
  text: description,
  margin: [0, 0, 0, MARGIN_MEDIUM],
});

/**
 * Render questions results
 */
const getQuestionsResults = (results: QuestionResultProps[]): Content[] => {
  const questionBlocks: Content[] = results.flatMap((result, index) => [
    {
      text: `Question ${++index}: ${result.questionName}`,
      style: "header",
      margin: [0, MARGIN_SMALL],
    },
    {
      text: [
        {text: "Description: ", bold: true},
        {text: convertAsterisksToOrderedList(result.questionDescription)},
      ],
      margin: [0, MARGIN_SMALL],
    },
    {
      text: [
        {text: "Correct Answer: ", bold: true},
        {text: result.questionAnswer},
      ],
      margin: [0, MARGIN_SMALL],
    },
    {
      text: [
        {text: "Your Answer: ", bold: true},
        {text: result.userAnswer},
      ],
      margin: [0, MARGIN_SMALL],
    },
    {
      text: [
        {text: "Result: ", bold: true},
        {text: result.isOk ? RESULT.RIGHT : RESULT.WRONG},
      ],
      margin: [0, MARGIN_SMALL],
    },
    {
      text: [
        {text: "Result Description: ", bold: true},
        {text: result.resultDescription},
      ],
      margin: [0, MARGIN_SMALL],
    },
  ]);

  return [
    {
      text: "Test Results",
      style: "header",
      margin: [0, MARGIN_LARGE, 0, MARGIN_MEDIUM],
      alignment: "center",
    },
    ...questionBlocks,
  ];
};

/**
 * Pdfmake instance
 */
export const downloadResultTestPdf = async (resultTest: ResultsParams, language: Language) => {
  const completedAtDefinition = getCompletedAt(resultTest.sessionResult.createdAt);
  const descriptionDefinition = getDescription(resultTest.sessionResult.resultDescription);
  const questionsResultsDefinition = getQuestionsResults(resultTest.questionResults);
  const testNameDefinition = await getTestName(resultTest.sessionResult.testUuid);

  const docDefinition: TDocumentDefinitions = {
    content: [
      testNameDefinition,
      completedAtDefinition,
      descriptionDefinition,
      questionsResultsDefinition,
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
      },
    },
  };

  const pdf = (await LazyLoader.getPDFMake()).createPdf(docDefinition);
  pdf.download("test-result.pdf");

  displayNotification({
    text: LanguageService.common.notifications.pdfDownloaded[language],
    type: NotificationType.INFO,
  });
};
