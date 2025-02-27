import {healthCheckService} from "src/service/services";

/**
 * HealthCheckService
 */
export class HealthCheckService {

  /**
   * Check the health of the API
   */
  public static async getHealthCheck(): Promise<void> {
    await healthCheckService.healthcheckGet();
  }

}
