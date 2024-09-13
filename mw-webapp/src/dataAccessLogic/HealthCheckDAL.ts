import {HealthCheckService} from "src/service/HealthCheckService ";

/**
 * HealthCheckDAL
 */
export class HealthCheckDAL {

  /**
   * Method to check the health of the API
   */
  public static async checkApiHealth(): Promise<void> {
    await HealthCheckService.getHealthCheck();
  }

}
