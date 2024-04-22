import {JobDoneJobTagService} from "src/service/JobDoneJobTagService";

/**
 * Params for {@link JobDoneJobTagDAL.createJobDoneJobTag}
 */
interface CreateJobDoneJobTagParams {

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
 * Provides methods to interact with the JobDoneJobTags
 */
export class JobDoneJobTagDAL {

  /**
   * Create jobDone job tag
   */
  public static async createJobDoneJobTag(requestParameters: CreateJobDoneJobTagParams): Promise<void> {
    await JobDoneJobTagService.createJobDoneJobTag({request: requestParameters});
  }

  /**
   * Delete jobDone job tag by UUID
   */
  public static async deleteJobDoneJobTag(requestParameters: CreateJobDoneJobTagParams): Promise<void> {
    await JobDoneJobTagService.deleteJobDoneJobTag({
      jobDoneId: requestParameters.jobDoneUuid,
      jobTagId: requestParameters.jobTagUuid,
    });
  }

}
