import {Label} from "src/model/businessModel/Label";
import {JobTagService} from "src/service/JobTagService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the jobTag
 */
export class LabelDAL {

  /**
   * Create metric
   */
  public static async createLabel(wayUuid: string, name: string, color: string): Promise<Label> {
    const jobTagDTO = await JobTagService.createJobTag({
      request: {
        color,
        description: "",
        name,
        wayUuid,
      },
    });

    const jobTag = new Label({...jobTagDTO});

    return jobTag;
  }

  /**
   * Update job tag
   */
  public static async updateLabel(params: PartialWithUuid<Label>): Promise<Label> {

    const updatedLabelDTO = await JobTagService.updateJobTag({
      jobTagId: params.uuid,
      request: {...params},
    });

    const updatedLabel = new Label({...updatedLabelDTO});

    return updatedLabel;
  }

  /**
   * Delete jobTag by UUID
   */
  public static async deleteLabel(jobTagId: string): Promise<void> {
    await JobTagService.deleteJobTag({jobTagId});
  }

}
