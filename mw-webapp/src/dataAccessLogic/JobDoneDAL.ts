import {jobDoneDTOToJobDone} from "src/dataAccessLogic/DTOToPreviewConverter/jobDoneDTOToJobDone";
import {JobDone} from "src/model/businessModel/JobDone";
import {Label} from "src/model/businessModel/Label";
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

    const jobDone = jobDoneDTOToJobDone(jobDoneDTO);

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
      tags: updatedJobDoneDTO.tags.map((label) => new Label(label)),
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
