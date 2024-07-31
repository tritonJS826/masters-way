import {HealthCheckService} from "src/service/HealthCheckService ";

/**
 * HealthCheckDAL
 */
export class HealthCheckDAL {

  /**
   * Method to check the health of the API
   */
  public static async checkApiHealth(): Promise<boolean> {
    try {
      const healthCheckDTO = await HealthCheckService.getHealthCheck();

      return healthCheckDTO.message === "The way APi is working fine";
    } catch (error) {
      return false;
    }
  }

}
