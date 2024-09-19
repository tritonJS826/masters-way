import {metricToMetricDTO} from "src/dataAccessLogic/BusinessToDTOConverter/metricToMetricDTO";
import {Metric} from "src/model/businessModel/Metric";
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

}
