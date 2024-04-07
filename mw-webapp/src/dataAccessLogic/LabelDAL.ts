import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {JobTagService} from "src/service/JobTagService";

/**
 * Provides methods to interact with the jobTag
 */
export class LabelDAL {

  /**
   * Create metric
   */
  public static async createLabel(wayUuid: string, name: string, color: string): Promise<JobTag> {
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
   * Update job tag
   */
  public static async updateLabel(params: JobTag): Promise<JobTag> {

    await JobTagService.updateJobTag({
      jobTagId: params.uuid,
      request: {
        color: params.color,
        description: params.description,
        name: params.name,
      },
    });

    return params;
  }

  /**
   * Delete jobTag by UUID
   */
  public static async deleteLabel(jobTagId: string): Promise<void> {
    await JobTagService.deleteJobTag({jobTagId});
  }

}
