import {healthCheckService} from "src/service/services";

/**
 * HealthCheckService
 */
export class HealthCheckService {

  /**
   * Check the health of the API
   */
  public static async getHealthCheck(): Promise<{ [key: string]: string }> {
    const healthCheck = await healthCheckService.healthcheckGet();

    return healthCheck;
  }

}
