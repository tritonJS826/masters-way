import {GenerateMetricsRequest} from "src/apiAutogenerated";
import {aiService} from "src/service/services";

/**
 * Provides methods to interact with the AI
 */
export class AIService {

  /**
   * Generate metrics by AI
   */
  public static async generateMetrics(requestParameters: GenerateMetricsRequest): Promise<string[]> {
    const metrics = await aiService.generateMetrics(requestParameters);

    return metrics;
  }

}
