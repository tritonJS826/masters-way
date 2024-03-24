import {JobDone} from "src/model/businessModel/JobDone";
import {Plan} from "src/model/businessModel/Plan";
import {JobDoneService} from "src/service/JobDoneService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the jobsDone
 */
export class JobDoneDAL {

  /**
   * Create jobDone
   */
  public static async createJobDone(ownerUuid: string, dayReportUuid: string, plan?: Plan): Promise<JobDone> {
    const jobDone = await JobDoneService.createJobDone({
      request: {
        dayReportUuid,
        description: plan?.job ?? "",
        ownerUuid,
        time: plan?.estimationTime ?? 0,
      },
    });

    return jobDone;
  }

  /**
   * Update jobDone
   */
  public static async updateJobDone(jobDone: PartialWithUuid<JobDone>): Promise<JobDone> {
    const updatedJobDone = await JobDoneService.updateJobDone({
      jobDoneId: jobDone.uuid,
      request: jobDone,
    });

    return updatedJobDone;
  }

  /**
   * Delete jobDone by UUID
   */
  public static async deleteJobDone(jobDoneId: string): Promise<void> {
    await JobDoneService.deleteJobDone({jobDoneId});
  }

}
