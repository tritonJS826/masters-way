import {SchemasHealthCheckResponse} from "src/apiAutogenerated/general";
import {healthCheckService} from "src/service/services";

/**
 * HealthCheckService
 */
export class HealthCheckService {

  /**
   * Check the health of the API
   */
  public static async getHealthCheck(): Promise<SchemasHealthCheckResponse> {
    const healthCheck = await healthCheckService.getHealthCheck();

    return healthCheck;
  }

}
