import {metricToMetricDTO} from "src/dataAccessLogic/BusinessToDTOConverter/metricToMetricDTO";
import {practiceMaterialDTOToPracticeMaterial} from
  "src/dataAccessLogic/DTOToPreviewConverter/practiceMaterialDTOToPracticeMaterial";
import {questionDTOToQuestion} from "src/dataAccessLogic/DTOToPreviewConverter/questionDTOToQuestion";
import {theoryMaterialDTOToTheoryMaterial} from "src/dataAccessLogic/DTOToPreviewConverter/theoryMaterialDTOToTheoryMaterial";
import {Language} from "src/globalStore/LanguageStore";
import {Metric} from "src/model/businessModel/Metric";
import {PracticeMaterial} from "src/model/businessModel/PracticeMaterial";
import {Question} from "src/model/businessModel/Test";
import {TheoryMaterial} from "src/model/businessModel/TheoryMaterial";
import {AIService} from "src/service/AIService";

/**
 * Generate metrics using AI params
 */
interface GenerateMetricsParams {

  /**
   * Way's goal description
   */
  goalDescription: string;

  /**
   * Way's metrics that exists yet
   */
  metrics: Metric[];

  /**
   * Way's name
   */
  wayName: string;

  /**
   * The app language
   */
  language: Language;
}

/**
 * Generate plans by metric using AI params
 */
interface GeneratePlansByMetricParams {

  /**
   * Way's goal
   */
  goal: string;

  /**
   * Way's metric
   */
  metric: string;

  /**
   * The app language
   */
  language: Language;
}

/**
 * Comment issue based on goal and message using AI params
 */
interface CommentIssueParams {

  /**
   * Way's goal
   */
  goal: string;

  /**
   * Way's issue (problem, plan, etc)
   */
  message: string;

  /**
   * The app language
   */
  language: Language;
}

/**
 * Decompose issue based on goal and message using AI params
 */
interface DecomposeIssueParams {

  /**
   * Way's goal
   */
  goal: string;

  /**
   * Way's issue (problem, plan, etc)
   */
  message: string;

  /**
   * The app language
   */
  language: Language;
}

/**
 * Estimate issue based on goal and message using AI params
 */
interface EstimateIssueParams {

  /**
   * Way's goal
   */
  goal: string;

  /**
   * Way's issue (problem, plan, etc)
   */
  issue: string;

  /**
   * The app language
   */
  language: Language;
}

/**
 * Generate topic based on the message by AI params
 */
interface GenerateTopicParams {

  /**
   * Topics amount
   */
  topicsAmount: number;

  /**
   * Training ID
   */
  trainingId: string;

  /**
   * Topic's parent Id
   */
  topicParentId?: string;

  /**
   * The app language
   */
  language: Language;
}

/**
 * Generate theory material based on the topic by AI params
 */
interface GenerateTheoryMaterialParams {

  /**
   * Training ID
   */
  trainingId: string;

  /**
   * Topic ID
   */
  topicId: string;

  /**
   * The app language
   */
  language: Language;

}

/**
 * Generate test questions based on the description by AI params
 */
interface GenerateTestQuestionsParams {

  /**
   * Test ID
   */
  testId: string;

  /**
   * Amount of questions to generate
   */
  generateAmount: number;

  /**
   * The app language
   */
  language: Language;

}

/**
 * Generate practice material based on the topic by AI params
 */
interface GeneratePracticeMaterialParams {

  /**
   * Training ID
   */
  trainingId: string;

  /**
   * Topic ID
   */
  topicId: string;

  /**
   * Amount of practice materials
   */
  generateAmount: number;

  /**
   * The app language
   */
  language: Language;

}

/**
 * Generate training based on testSessionResult info
 */
interface GenerateTrainingByTestSessionResultParams {

  /**
   * Amount of topics
   */
  generateTopicsAmount: number;

  /**
   * The app language
   */
  language: Language;

  /**
   * Amount of practice materials in each topic
   */
  practiceMaterialInEachTopic: number;

  /**
   * Test Uuid
   */
  testId: string;

  /**
   * Test session Uuid
   */
  testSessionId: string;

  /**
   * Test session result Uuid
   */
  sessionResultId: string;

}

/**
 * Provides methods to interact with the comments
 */
export class AIDAL {

  /**
   * Generate metrics by AI
   */
  public static async generateMetrics(params: GenerateMetricsParams): Promise<string[]> {
    const oldMetricsDTO = params.metrics.map(metricToMetricDTO);

    const metricsDTO = await AIService.generateMetrics({
      request: {
        goalDescription: params.goalDescription,
        metrics: oldMetricsDTO.map(metric => metric.description),
        wayName: params.wayName,
        language: params.language,
      },
    });

    return metricsDTO.metrics;
  }

  /**
   * Generate plans based on metrics by AI
   */
  public static async aiPlansByMetrics(params: GeneratePlansByMetricParams): Promise<string[]> {
    const plans = await AIService.aiPlansByMetrics({
      request: {
        goal: params.goal,
        metric: params.metric,
        language: params.language,
      },
    });

    return plans.plans;
  }

  /**
   * Estimate issue by AI
   */
  public static async aiEstimateIssue(params: EstimateIssueParams): Promise<string> {
    const estimationMessage = await AIService.aiEstimateIssue({
      request: {
        goal: params.goal,
        issue: params.issue,
        language: params.language,
      },
    });

    return estimationMessage.estimation;
  }

  /**
   * Decompose issue by AI
   */
  public static async aiDecomposeIssue(params: DecomposeIssueParams): Promise<string[]> {
    const plans = await AIService.aiDecomposeIssue({
      request: {
        goal: params.goal,
        message: params.message,
        language: params.language,
      },
    });

    return plans.plans;
  }

  /**
   * Comment issue by AI
   */
  public static async aiCommentIssue(params: CommentIssueParams): Promise<string> {
    const comment = await AIService.aiCommentIssue({
      request: {
        goal: params.goal,
        message: params.message,
        language: params.language,
      },
    });

    return comment.goal;
  }

  /**
   * Generate answer based on the message by AI
   */
  public static async aiChat(message: string, language: Language): Promise<string> {
    const answer = await AIService.aiChat({
      request: {
        message,
        language,
      },
    });

    return answer.message;
  }

  /**
   * Generate topic based on the message by AI
   */
  public static async aiTopic(params: GenerateTopicParams): Promise<string[]> {
    const topicsDTO = await AIService.aiTopic({
      request: {
        topicsAmount: params.topicsAmount,
        trainingId: params.trainingId,
        parentTopicId: params.topicParentId,
        language: params.language,
      },
    });

    const topicsPreview = topicsDTO.topics.map(topic => topic.name);

    return topicsPreview;
  }

  /**
   * Generate theory material based on the topic by AI
   */
  public static async aiCreateTheoryMaterial(params: GenerateTheoryMaterialParams): Promise<TheoryMaterial> {
    const theoryMaterialDTO = await AIService.aiCreateTheoryMaterial({
      request: {
        topicId: params.topicId,
        trainingId: params.trainingId,
        language: params.language,
      },
    });

    const theoryMaterial = theoryMaterialDTOToTheoryMaterial(theoryMaterialDTO);

    return theoryMaterial;
  }

  /**
   * Generate practice material based on the topic by AI
   */
  public static async aiCreatePracticeMaterial(params: GeneratePracticeMaterialParams): Promise<PracticeMaterial[]> {
    const practiceMaterialsDTO = await AIService.aiCreatePracticeMaterial({
      request: {
        topicId: params.topicId,
        generateAmount: params.generateAmount,
        trainingId: params.trainingId,
        language: params.language,
      },
    });

    const practiceMaterials = practiceMaterialsDTO.practiceMaterials.map(practiceMaterialDTOToPracticeMaterial);

    return practiceMaterials;
  }

  /**
   * Generate questions for test based on the description by AI
   */
  public static async aiCreateTestQuestions(params: GenerateTestQuestionsParams): Promise<Question[]> {
    const testQuestionsDTO = await AIService.aiCreateTestQuestions({
      request: {
        generateAmount: params.generateAmount,
        testId: params.testId,
        language: params.language,
      },
    });

    const testQuestions = testQuestionsDTO.questions.map(questionDTOToQuestion);

    return testQuestions;
  }

  /**
   * Generate training based on the testSessionResult
   */
  public static async aiCreateTrainingByTestSession(
    params: GenerateTrainingByTestSessionResultParams,
  ): Promise<string> {
    const trainingId = await AIService.aiCreateTrainingByTestSession({
      sessionResultId: params.sessionResultId,
      request: {
        generateTopicsAmount: params.generateTopicsAmount,
        language: params.language,
        practiceMaterialInEachTopic: params.practiceMaterialInEachTopic,
        testId: params.testId,
        testSessionId: params.testSessionId,
      },
    });

    return trainingId.trainingId;
  }

}
