import {practiceMaterialToPracticeMaterialDTOPartial}
  from "src/dataAccessLogic/BusinessToDTOConverter/practiceMaterialToPracticeMaterialDTOPartial";
import {practiceMaterialDTOToPracticeMaterial}
  from "src/dataAccessLogic/DTOToPreviewConverter/practiceMaterialDTOToPracticeMaterial";
import {PracticeMaterial} from "src/model/businessModel/PracticeMaterial";
import {PracticeMaterialService} from "src/service/PracticeMaterialService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * All practice materials params
 */
export interface AllPracticeMaterialsParams {

  /**
   * PracticeMaterials amount
   */
  size: number;

  /**
   * Array of PracticeMaterials preview
   */
  practiceMaterials: PracticeMaterial[];
}

/**
 * Create practiceMaterial params
 */
export interface CreatePracticeMaterialParams {

  /**
   * Practice's uuid
   */
  topicUuid: string;

  /**
   * PracticeMaterial's name
   */
  name: string;

  /**
   * PracticeMaterial's description
   */
  taskDescription: string;

  /**
   * PracticeMaterial's answer
   */
  answer: string;

  /**
   * PracticeMaterial's practiceType
   */
  practiceType: string;

  /**
   * PracticeMaterial's timeToAnswer
   */
  timeToAnswer: number;

}

/**
 * Provides methods to interact with the PracticeMaterials
 */
export class PracticeMaterialDAL {

  /**
   * Create practice material
   */
  public static async createPracticeMaterial(params: CreatePracticeMaterialParams): Promise<PracticeMaterial> {
    const practiceMaterialDTO = await PracticeMaterialService.createPracticeMaterial({
      topicId: params.topicUuid,
      request: {
        answer: params.answer,
        name: params.name,
        practiceType: params.practiceType,
        taskDescription: params.taskDescription,
        timeToAnswer: params.timeToAnswer,
        topicUuid: params.topicUuid,
      },
    });

    const practiceMaterial = practiceMaterialDTOToPracticeMaterial(practiceMaterialDTO);

    return practiceMaterial;
  }

  /**
   * Get practice materials by topic UUID
   */
  public static async getPracticeMaterialsByTopicUuid(topicId: string): Promise<AllPracticeMaterialsParams> {
    const practiceMaterialsDTO = await PracticeMaterialService.getPracticeMaterialsByTopicUuid({topicId});

    const practiceMaterials = practiceMaterialsDTO.practiceMaterials.map(practiceMaterialDTOToPracticeMaterial);

    const allPracticeMaterialsParams = {
      size: practiceMaterialsDTO.size,
      practiceMaterials,
    };

    return allPracticeMaterialsParams;
  }

  /**
   * Update practice material
   */
  public static async updatePracticeMaterial(practiceMaterial: PartialWithUuid<PracticeMaterial>): Promise<PracticeMaterial> {
    const practiceMaterialDTOPartial = practiceMaterialToPracticeMaterialDTOPartial(practiceMaterial);
    const updatedPracticeMaterialDTO = await PracticeMaterialService.updatePracticeMaterial({
      practiceMaterialId: practiceMaterial.uuid,
      request: practiceMaterialDTOPartial,
    });

    const updatedPracticeMaterial = practiceMaterialDTOToPracticeMaterial(updatedPracticeMaterialDTO);

    return updatedPracticeMaterial;
  }

  /**
   * Delete practice material
   */
  public static async deletePracticeMaterial(practiceMaterialId: string): Promise<void> {
    await PracticeMaterialService.deletePracticeMaterial({practiceMaterialId});
  }

}
