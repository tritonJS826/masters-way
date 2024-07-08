import {metricToMetricDTO} from "src/dataAccessLogic/BusinessToDTOConverter/metricToMetricDTO";
import {Metric} from "src/model/businessModel/Metric";
import {AIService} from "src/service/AIService";

/**
 * Generate metrics params
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
 * Provides methods to interact with the comments
 */
export class AIDAL {

  /**
   * Generate metrics by AI
   */
  public static async generateMetrics(params: GenerateMetricsParams): Promise<string> {
    const oldMetricsDTO = params.metrics.map(metricToMetricDTO);

    const metricsDTO = await AIService.generateMetrics({
      request: {
        goalDescription: params.goalDescription,
        metrics: oldMetricsDTO,
        wayName: params.wayName,
      },
    });

    const metrics = metricsDTO.answer ?? "hello";

    return metrics;
  }

}
