import {Metric} from "src/model/businessModel/Metric";
import {MetricService} from "src/service/MetricService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the metrics
 */
export class MetricDAL {

  /**
   * Create metric
   */
  public static async createMetric(wayUuid: string): Promise<Metric> {
    const metricDTO = await MetricService.createMetric({
      request: {
        description: "",
        doneDate: "",
        estimationTime: 0,
        isDone: false,
        wayUuid,
      },
    });

    const metric = new Metric({
      ...metricDTO,
      doneDate: metricDTO.doneDate ? new Date(metricDTO.doneDate) : null,
    });

    return metric;
  }

  // /**
  //  * Get metrics by Way UUID
  //  */
  // public static async getMetrics(requestParameters: GetMetricsByWayUuidRequest): Promise<SchemasMetricResponse[]> {
  //   const jobsDone = await metricService.getMetricsByWayUuid(requestParameters);

  //   return jobsDone;
  // }

  /**
   * Update metric
   */
  public static async updateMetric(metric: PartialWithUuid<Metric>): Promise<Metric> {
    const updatedMetricDTO = await MetricService.updateMetric({
      metricId: metric.uuid,
      request: {
        ...metric,
        doneDate: metric.doneDate?.toISOString() ?? "",
      },
    });

    const updatedMetric = new Metric({
      ...updatedMetricDTO,
      doneDate: updatedMetricDTO.doneDate ? new Date(updatedMetricDTO.doneDate) : null,
    });

    return updatedMetric;
  }

  /**
   * Delete metric by UUID
   */
  public static async deleteMetric(metricId: string): Promise<void> {
    await MetricService.deleteMetric({metricId});
  }

}
