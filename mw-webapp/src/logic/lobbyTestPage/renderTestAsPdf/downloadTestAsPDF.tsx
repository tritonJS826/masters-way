import pdfMake from "pdfmake/build/pdfmake";
import {Content, ContentText, TDocumentDefinitions} from "pdfmake/interfaces";
import {Question, Test} from "src/model/businessModel/Test";
import {convertAsterisksToOrderedList} from "src/utils/convertAsterisksToOrderedList";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 20;

const QUESTION_INDEX_STEP = 1;

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
const getTestName = (test: Test): Content => {
  return {
    text: test.name,
    style: "header",
    bold: true,
    fontSize: 20,
    margin: [0, MARGIN_MEDIUM],
    alignment: "center",
  };
};

/**
 * Get test time
 */
const getTestTime = (timeToTest: number): Content => {
  return {text: `Time to complete the test: ${timeToTest} minutes`};
};

/**
 * Get number of questions
 */
const getNumberOfQuestions = (questions: Question[]): Content => {
  return {text: `Number of questions: ${questions.length}`};
};

/**
 * Render description
 */
const getDescription = (description: string): ContentText => ({text: description});

/**
 * Get link to the test
 */
const getLinkToTest = (test: Test): Content => {
  return {text: ` Link to the test: https://mastersway.netlify.app/lobbyTest/${test.uuid}`};
};

/**
 * Render questions
 */
const getQuestions = (questions: Question[]): Content[] => {
  return questions.flatMap((question, index) => [
    {
      text: `Question ${index + QUESTION_INDEX_STEP}: ${question.name}`,
      bold: true,
      fontSize: 14,
      margin: [0, MARGIN_MEDIUM, 0, MARGIN_SMALL],
    },
    {
      text: convertAsterisksToOrderedList(question.questionText),
      fontSize: 12,
      margin: [MARGIN_MEDIUM, 0, 0, MARGIN_SMALL],
    },
    {
      text: "Answer:",
      fontSize: 12,
      margin: [MARGIN_MEDIUM, MARGIN_MEDIUM, 0, MARGIN_LARGE],
      color: "#666666",
    },
  ]);
};

/**
 * Download test as pdf
 */
export const downloadTestAsPDF = (test: Test, timeToTest: number) => {
  const descriptionDefinition = getDescription(test.description);
  const questionsDefinition = getQuestions(test.questions);
  const testNameDefinition = getTestName(test);
  const testTimeDefinition = getTestTime(timeToTest);
  const linkToTestDefinition = getLinkToTest(test);
  const numberOfQuestionsDefinition = getNumberOfQuestions(test.questions);

  const docDefinition: TDocumentDefinitions = {
    content: [
      testNameDefinition,
      descriptionDefinition,
      testTimeDefinition,
      numberOfQuestionsDefinition,
      linkToTestDefinition,
      questionsDefinition,
    ],

  };

  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${test.name}.pdf`);
};
