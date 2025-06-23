import pdfMake from "pdfmake/build/pdfmake";
import {Content, ContentText, TDocumentDefinitions} from "pdfmake/interfaces";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {ResultsParams} from "src/logic/resultTestPage/ResultTestPageStore";
import {QuestionResultProps} from "src/model/businessModel/QuestionResult";
import {DateUtils} from "src/utils/DateUtils";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 20;

const RESULT = {
  RIGHT: "Right",
  WRONG: "Wrong",
};

pdfMake.fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
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
  return [
    {
      text: "Test Results",
      style: "header",
      bold: true,
      fontSize: 18,
      margin: [0, MARGIN_LARGE, 0, MARGIN_MEDIUM],
      alignment: "center",
    },
    {
      ol: results.map(result => [
        {
          text: [
            {text: "Question: ", bold: true},
            result.questionName,
            "\n",
            {text: "Description: ", bold: true},
            result.questionDescription,
            "\n",
            {text: "Correct Answer: ", bold: true},
            result.questionAnswer,
            "\n",
            {text: "Your Answer: ", bold: true},
            result.userAnswer,
            "\n",
            {text: "Result: ", bold: true},
            {text: result.isOk ? RESULT.RIGHT : RESULT.WRONG},
            "\n",
            {text: "Result Description: ", bold: true},
            result.resultDescription,
          ],
          margin: [0, MARGIN_SMALL, 0, MARGIN_SMALL],
        },
      ]),
      margin: [0, MARGIN_MEDIUM, 0, 0],
    },
  ];
};

/**
 *
 * Examples:
 * https://codepen.io/diguifi/pen/YdBbyz
 * https://brahmaputra1996.medium.com/
 * client-side-pdf-generation-if-you-struggled-with-dynamic-content-positioning-in-jspdf-459aef48dc30
 */
export const downloadResultTestPdf = async (resultTest: ResultsParams) => {
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
      tableHeader: {
        bold: true,
        fontSize: 12,
      },
      tableCell: {
        fontSize: 10,
        margin: [0, MARGIN_SMALL],
      },
    },
  };

  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download("test-result.pdf");
};
