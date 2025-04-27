import {metricToMetricDTO} from "src/dataAccessLogic/BusinessToDTOConverter/metricToMetricDTO";
import {practiceMaterialDTOToPracticeMaterial} from
  "src/dataAccessLogic/DTOToPreviewConverter/practiceMaterialDTOToPracticeMaterial";
import {theoryMaterialDTOToTheoryMaterial} from "src/dataAccessLogic/DTOToPreviewConverter/theoryMaterialDTOToTheoryMaterial";
import {Metric} from "src/model/businessModel/Metric";
import {PracticeMaterial} from "src/model/businessModel/PracticeMaterial";
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
}

/**
 * Generate theory material based on the topic by AI params
 */
interface GenerateTheoryMaterialParams {

  /**
   * Training name
   */
  trainingName: string;

  /**
   * Topic ID
   */
  topicId: string;

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
      },
    });

    return comment.goal;
  }

  /**
   * Generate answer based on the message by AI
   */
  public static async aiChat(message: string): Promise<string> {
    const answer = await AIService.aiChat({request: {message}});

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
        trainingName: params.trainingName,
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
      },
    });

    const practiceMaterials = practiceMaterialsDTO.practiceMaterials.map(practiceMaterialDTOToPracticeMaterial);

    return practiceMaterials;
  }

}
