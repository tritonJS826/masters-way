import {Content, ContentText, TDocumentDefinitions} from "pdfmake/interfaces";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {Language} from "src/globalStore/LanguageStore";
import {PracticeMaterial} from "src/model/businessModel/PracticeMaterial";
import {TheoryMaterial} from "src/model/businessModel/TheoryMaterial";
import {Topic} from "src/model/businessModel/Topic";
import {Training} from "src/model/businessModel/Training";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {DateUtils} from "src/utils/DateUtils";
import {LazyLoader} from "src/utils/DependencyLazyLoader/lazyLoader";
import {parseMarkdownToPdf} from "src/utils/markdown/markdownToPdfParser";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 20;

/**
 * Render title
 */
const getTitle = (wayName: string): ContentText => ({
  alignment: "center",
  text: wayName,
  style: "header",
  fontSize: 23,
  bold: true,
  margin: [0, MARGIN_MEDIUM],
});

/**
 * Render createdAt and lastUpdate dates
 */
const getDates = (createdAt: Date, lastUpdate: Date) => {
  return [
    `Created at: ${DateUtils.getShortISODateValue(createdAt)}`,
    `Last update: ${DateUtils.getShortISODateValue(lastUpdate)}`,
  ];
};

/**
 * Render header
 */
const getHeader = (training: Training): Content[] => {
  return [
    {
      text: `Training link: https://mastersway.netlify.app/training/${training.uuid}`,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    {
      text: `PDF Downloaded at: ${DateUtils.getShortISODateValue(new Date())}`,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
  ];
};

/**
 * Render owner's name
 */
const getOwner = (owner: string): ContentText => ({
  text: `Owner: ${owner}`,
  alignment: "left",
  margin: [0, MARGIN_SMALL, 0, 0],
});

/**
 * Render description
 */
const getDescription = (description: string): Content => {
  const parsed = parseMarkdownToPdf(description);

  return {text: parsed, margin: [0, MARGIN_MEDIUM]};
};

/**
 * Render topics
 */
const getTopics = (topics: TopicPreview[]): Content[] => {
  return [
    {
      text: "Table of Contents",
      style: "header",
      bold: true,
      margin: [0, MARGIN_MEDIUM, 0, 0],
    },
    {
      ol: topics.map(topic => ({
        text: topic.name,
        margin: [0, MARGIN_SMALL, 0, 0],
        tocItem: true,
      })),
    },
  ];
};

/**
 * Render topic material
 */
const getTopicMaterials = (topicMaterials: Topic[]): Content[] => {

  return topicMaterials.flatMap((topic, index) => {
    const topicTitle: ContentText = {
      text: `${++index}. ${topic.name}`,
      style: "header",
      bold: true,
      fontSize: 18,
      margin: [0, MARGIN_LARGE],
      alignment: "center",
    };

    const theoryMaterials: Content[] = topic.theoryMaterials.map((material: TheoryMaterial) => {
      const theoryHeader: ContentText = {
        text: material.name,
        bold: true,
        margin: [0, MARGIN_MEDIUM, 0, MARGIN_SMALL],
        alignment: "center",
      };

      const theoryDescription: ContentText = {
        text: parseMarkdownToPdf(material.description),
        margin: [MARGIN_SMALL, 0, 0, MARGIN_SMALL],
      };

      return [theoryHeader, theoryDescription];
    });

    const practiceMaterialHeader: ContentText = {
      text: topic.practiceMaterials.length > 0 ? "Practice Materials" : "",
      bold: true,
      margin: [0, MARGIN_MEDIUM],
    };

    const practiceMaterials: Content[] = topic.practiceMaterials.map((material: PracticeMaterial) => {
      const practiceHeader: ContentText = {
        text: material.name,
        bold: true,
        margin: [0, MARGIN_MEDIUM],
      };

      const practiceDescription: ContentText = {text: parseMarkdownToPdf(material.taskDescription)};

      return [practiceHeader, practiceDescription];
    });

    return [topicTitle, ...theoryMaterials, practiceMaterialHeader, ...practiceMaterials];
  });
};

/**
 * Download training as pdf
 */
export const downloadTrainingPdf = async (training: Training, language: Language) => {

  const topicMaterials = await Promise.all(
    training.topics.map(topicPreview =>
      TopicDAL.getTopic(topicPreview.uuid),
    ),
  );

  const headerDefinition = getHeader(training);
  const titleDefinition = getTitle(training.name);
  const ownerDefinition = getOwner(training.owner.name);
  const datesDefinition = getDates(training.createdAt, training.updatedAt);
  const descriptionDefinition = getDescription(training.description);
  const topicsDefinition = getTopics(training.topics);
  const topicsMaterialsDefinition = getTopicMaterials(topicMaterials);

  const docDefinition: TDocumentDefinitions = {
    content: [
      titleDefinition,
      ownerDefinition,
      headerDefinition,
      datesDefinition,
      descriptionDefinition,
      topicsDefinition,
      topicsMaterialsDefinition,
    ],
  };

  await LazyLoader.getPdfDownloader().createPdf(docDefinition, language, `${training.name}.pdf`);
};
