import {JobDoneLabelService} from "src/service/JobDoneLabelService";

/**
 * Params for {@link JobDoneLabelDAL.createJobDoneLabel}
 */
interface CreateJobDoneLabelParams {

  /**
   * Label's uuid
   */
  labelUuid: string;

  /**
   * Job done uuid
   */
  jobDoneUuid: string;
}

/**
 * Provides methods to interact with the JobDoneLabel
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
  public static async deleteJobDoneJobTag(requestParameters: CreateJobDoneLabelParams): Promise<void> {
    await JobDoneLabelService.deleteJobDoneLabel({
      jobDoneId: requestParameters.jobDoneUuid,
      labelId: requestParameters.labelUuid,
    });
  }

}
