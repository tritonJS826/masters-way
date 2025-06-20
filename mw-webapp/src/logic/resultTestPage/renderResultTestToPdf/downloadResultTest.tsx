import pdfMake from "pdfmake/build/pdfmake";
import {Content, ContentText, TDocumentDefinitions} from "pdfmake/interfaces";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {ResultsParams} from "src/logic/resultTestPage/ResultTestPageStore";
import {QuestionResultProps} from "src/model/businessModel/QuestionResult";
import {DateUtils} from "src/utils/DateUtils";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 20;

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
    margin: [0, MARGIN_LARGE, 0, MARGIN_MEDIUM],
    alignment: "center",
  };
};

/**
 * Render createdAt dates
 */
const getCompletedAt = (createdAt: Date): ContentText => ({
  text: `Test is completed at ${DateUtils.getShortISODateValue(createdAt)}`,
  margin: [0, MARGIN_MEDIUM],
});

/**
 * Render description
 */
const getDescription = (description: string): ContentText => ({
  text: description,
  margin: [0, MARGIN_MEDIUM],
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
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*", "*"],
        body: [
          [
            {text: "Question", style: "tableHeader"},
            {text: "Description", style: "tableHeader"},
            {text: "Correct Answer", style: "tableHeader"},
            {text: "Your Answer", style: "tableHeader"},
            {text: "Result", style: "tableHeader"},
            {text: "Result Description", style: "tableHeader"},
          ],
          ...results.map(result => [
            {text: result.questionName, style: "tableCell"},
            {text: result.questionDescription, style: "tableCell"},
            {text: result.questionAnswer, style: "tableCell"},
            {text: result.userAnswer, style: "tableCell"},
            {text: result.isOk ? "Right" : "Wrong", style: "tableCell"},
            {text: result.resultDescription, style: "tableCell"},
          ]),
        ],
      },
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
    pageOrientation: "landscape",
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
