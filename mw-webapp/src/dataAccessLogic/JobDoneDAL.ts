import {JobDone} from "src/model/businessModel/JobDone";
import {Plan} from "src/model/businessModel/Plan";
import {JobDoneService} from "src/service/JobDoneService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Create Job params
 */
interface CreateJobParams {

  /**
   * Owner UUID
   */
  ownerUuid: string;

  /**
   * DayReport UUID
   */
  dayReportUuid: string;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;

  /**
   * Plan info to create job
   */
  plan?: Plan;

}

/**
 * Update Job params
 */
interface UpdateJobParams {

  /**
   * Partial comment to update
   */
  jobDone: PartialWithUuid<JobDone>;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;
}

/**
 * Provides methods to interact with the jobsDone
 */
export class JobDoneDAL {

  /**
   * Create jobDone
   */
  public static async createJobDone(params: CreateJobParams): Promise<JobDone> {
    const jobDoneDTO = await JobDoneService.createJobDone({
      request: {
        dayReportUuid: params.dayReportUuid,
        description: params.plan?.description ?? "",
        ownerUuid: params.ownerUuid,
        time: params.plan?.time ?? 0,
        jobTagUuids: params.plan?.tags.map(tag => tag.uuid) ?? [],
      },
    });

    const jobDone = new JobDone({
      ...jobDoneDTO,
      createdAt: new Date(jobDoneDTO.createdAt),
      updatedAt: new Date(jobDoneDTO.updatedAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
    });

    return jobDone;
  }

  /**
   * Update jobDone
   */
  public static async updateJobDone(params: UpdateJobParams): Promise<JobDone> {
    const updatedJobDoneDTO = await JobDoneService.updateJobDone({
      jobDoneId: params.jobDone.uuid,
      request: params.jobDone,
    });

    const updatedJobDone = new JobDone({
      ...updatedJobDoneDTO,
      createdAt: new Date(updatedJobDoneDTO.createdAt),
      updatedAt: new Date(updatedJobDoneDTO.updatedAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
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
