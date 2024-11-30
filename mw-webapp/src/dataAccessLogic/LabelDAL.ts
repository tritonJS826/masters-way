import {Label} from "src/model/businessModel/Label";
import {LabelService} from "src/service/LabelService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the label
 */
export class LabelDAL {

  /**
   * Create label
   */
  public static async createLabel(wayUuid: string, name: string, color: string): Promise<Label> {
    const labelDTO = await LabelService.createLabel({
      request: {
        color,
        description: "",
        name,
        wayUuid,
      },
    });

    const label = new Label({...labelDTO});

    return label;
  }

  /**
   * Update label
   */
  public static async updateLabel(params: PartialWithUuid<Label>): Promise<Label> {

    const updatedLabelDTO = await LabelService.updateLabel({
      jobTagId: params.uuid,
      request: {...params},
    });

    const updatedLabel = new Label({...updatedLabelDTO});

    return updatedLabel;
  }

  /**
   * Delete label by UUID
   */
  public static async deleteLabel(labelId: string): Promise<void> {
    await LabelService.deleteLabel({jobTagId: labelId});
  }

}
