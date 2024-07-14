import {Metric} from "src/model/businessModel/Metric";
import {MetricService} from "src/service/MetricService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Params For create metric method
 */
interface CreateMetricParams {

  /**
   * Way Uuid
   */
  wayUuid: string;

  /**
   * Metric description
   */
  description?: string;
}

/**
 * Provides methods to interact with the metrics
 */
export class MetricDAL {

  /**
   * Create metric
   */
  public static async createMetric(createMetricParams: CreateMetricParams): Promise<Metric> {
    const metricDTO = await MetricService.createMetric({
      request: {
        description: createMetricParams.description ?? "",
        doneDate: "",
        estimationTime: 0,
        isDone: false,
        wayUuid: createMetricParams.wayUuid,
      },
    });

    const metric = new Metric({
      ...metricDTO,
      doneDate: metricDTO.doneDate ? new Date(metricDTO.doneDate) : null,
    });

    return metric;
  }

  /**
   * Update metric
   */
  public static async updateMetric(metric: PartialWithUuid<Metric>): Promise<Metric> {
    const updatedMetricDTO = await MetricService.updateMetric({
      metricId: metric.uuid,
      request: {...metric},
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
