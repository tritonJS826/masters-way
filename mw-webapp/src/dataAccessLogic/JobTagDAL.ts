import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {JobTagService} from "src/service/JobTagService";

/**
 * Provides methods to interact with the jobTag
 */
export class JobTagDAL {

  /**
   * Create metric
   */
  public static async createJobTag(wayUuid: string, name: string, color: string): Promise<JobTag> {
    const jobTagDTO = await JobTagService.createJobTag({
      request: {
        color,
        description: "",
        name,
        wayUuid,
      },
    });

    const jobTag: JobTag = {...jobTagDTO};

    return jobTag;
  }

  /**
   * Delete jobTag by UUID
   */
  public static async deleteJobTag(jobTagId: string): Promise<void> {
    await JobTagService.deleteJobTag({jobTagId});
  }

}
