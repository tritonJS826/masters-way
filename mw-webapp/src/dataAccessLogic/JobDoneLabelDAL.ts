import {JobDoneLabelService} from "src/service/JobDoneLabelService";

/**
 * Params for {@link JobDoneLabelDAL.createJobDoneLabel}
 */
interface CreateJobDoneLabelParams {

  /**
   * Tag uuid
   */
  jobTagUuid: string;

  /**
   * Job done uuid
   */
  jobDoneUuid: string;
}

/**
 * Provides methods to interact with the JobDoneLabels
 */
export class JobDoneLabelDAL {

  /**
   * Create jobDone label
   */
  public static async createJobDoneLabel(requestParameters: CreateJobDoneLabelParams): Promise<void> {
    await JobDoneLabelService.createJobDoneLabel({request: requestParameters});
  }

  /**
   * Delete jobDone label by UUID
   */
  public static async deleteJobDoneLabel(requestParameters: CreateJobDoneLabelParams): Promise<void> {
    await JobDoneLabelService.deleteJobDoneLabel({
      jobDoneId: requestParameters.jobDoneUuid,
      jobTagId: requestParameters.jobTagUuid,
    });
  }

}
