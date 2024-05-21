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
    const jobDoneDTO = await JobDoneService.createJobDone({
      request: {
        dayReportUuid,
        description: plan?.description ?? "",
        ownerUuid,
        time: plan?.time ?? 0,
        jobTagUuids: plan?.tags.map(tag => tag.uuid) ?? [],
      },
    });

    const jobDone = new JobDone({
      ...jobDoneDTO,
      createdAt: new Date(jobDoneDTO.createdAt),
      updatedAt: new Date(jobDoneDTO.updatedAt),
    });

    return jobDone;
  }

  /**
   * Update jobDone
   */
  public static async updateJobDone(jobDone: PartialWithUuid<JobDone>): Promise<JobDone> {
    const updatedJobDoneDTO = await JobDoneService.updateJobDone({
      jobDoneId: jobDone.uuid,
      request: jobDone,
    });

    const updatedJobDone = new JobDone({
      ...updatedJobDoneDTO,
      createdAt: new Date(updatedJobDoneDTO.createdAt),
      updatedAt: new Date(updatedJobDoneDTO.updatedAt),
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
