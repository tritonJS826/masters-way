import {Content, ContentText, TDocumentDefinitions} from "pdfmake/interfaces";
import {Language} from "src/globalStore/LanguageStore";
import {Question, Test} from "src/model/businessModel/Test";
import {LazyLoader} from "src/utils/DependencyLazyLoader/lazyLoader";
import {renderMarkdownToPDF} from "src/utils/markdown/renderMarkdownToPDF";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;

const QUESTION_INDEX_STEP = 1;

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
const getQuestions = (questions: Question[], isIncludeAnswers: boolean): Content[] => {
  return questions.flatMap((question, index) => [
    {
      text: `Question ${index + QUESTION_INDEX_STEP}: ${question.name}`,
      bold: true,
      fontSize: 14,
      margin: [0, MARGIN_MEDIUM, 0, MARGIN_SMALL],
    },
    {
      text: renderMarkdownToPDF(question.questionText),
      fontSize: 12,
      margin: [MARGIN_MEDIUM, 0, 0, MARGIN_SMALL],
    },
    isIncludeAnswers ?
      {
        text: `Answer: ${question.answer}`,
        fontSize: 12,
        margin: [MARGIN_MEDIUM, MARGIN_MEDIUM, 0, MARGIN_SMALL],
        color: "#666666",
      } :
      {
        text: "Answer:",
        fontSize: 12,
        margin: [MARGIN_MEDIUM, MARGIN_MEDIUM, 0, MARGIN_SMALL],
        color: "#666666",
      },
  ]);
};

/**
 * Download test as pdf
 */
export const downloadTestAsPDF = async (test: Test, timeToTest: number, language: Language, isIncludeAnswers: boolean) => {

  const descriptionDefinition = getDescription(test.description);
  const questionsDefinition = getQuestions(test.questions, isIncludeAnswers);
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

  await LazyLoader.getPdfDownloader().createPdf(docDefinition, language, `${test.name}.pdf`);
};
