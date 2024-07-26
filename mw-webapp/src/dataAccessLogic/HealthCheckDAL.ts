import {HealthCheckService} from "src/service/HealthCheckService ";

/**
 * Шnterface for API health check status
 */
export interface HealthCheckStatus {

  /**
   * Flag indicating whether the API is working
   */
  isWorkingApi: boolean;
}

/**
 * HealthCheckDAL
 */
export class HealthCheckDAL {

  /**
   * Method to check the health of the API
   */
  public static async checkApiHealth(): Promise<HealthCheckStatus> {
    try {
      const healthCheckDTO = await HealthCheckService.getHealthCheck();
      const isWorkingApi = healthCheckDTO.message === "The way APi is working fine";

      return {isWorkingApi};
    } catch (error) {
      return {isWorkingApi: false};
    }
  }

}
