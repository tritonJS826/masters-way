import {theoryMaterialToTheoryMaterialDTOPartial}
  from "src/dataAccessLogic/BusinessToDTOConverter/theoryMaterialToTheoryMaterialDTOPartial";
import {theoryMaterialDTOToTheoryMaterial} from "src/dataAccessLogic/DTOToPreviewConverter/theoryMaterialDTOToTheoryMaterial";
import {TheoryMaterial} from "src/model/businessModel/TheoryMaterial";
import {TheoryMaterialService} from "src/service/TheoryMaterialService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * All theory materials params
 */
export interface AllTheoryMaterialsParams {

  /**
   * TheoryMaterials amount
   */
  size: number;

  /**
   * Array of TheoryMaterials preview
   */
  theoryMaterials: TheoryMaterial[];
}

/**
 * Create theoryMaterial params
 */
export interface CreateTheoryMaterialParams {

  /**
   * Topic's uuid
   */
  topicUuid: string;

  /**
   * TheoryMaterial's name
   */
  name: string;

  /**
   * TheoryMaterial's description
   */
  description: string;

}

/**
 * Provides methods to interact with the TheoryMaterials
 */
export class TheoryMaterialDAL {

  /**
   * Create theory material
   */
  public static async createTheoryMaterial(params: CreateTheoryMaterialParams): Promise<TheoryMaterial> {
    const theoryMaterialDTO = await TheoryMaterialService.createTheoryMaterial({
      request: {
        name: params.name,
        description: params.description,
        topicUuid: params.topicUuid,
      },
    });

    const theoryMaterial = theoryMaterialDTOToTheoryMaterial(theoryMaterialDTO);

    return theoryMaterial;
  }

  /**
   * Get theory materials by topic UUID
   */
  public static async getTheoryMaterialsByTopicUuid(topicId: string): Promise<AllTheoryMaterialsParams> {
    const theoryMaterialsDTO = await TheoryMaterialService.getTheoryMaterialsByTopicUuid({topicId});

    const theoryMaterials = theoryMaterialsDTO.theoryMaterials.map(theoryMaterialDTOToTheoryMaterial);

    const allTheoryMaterialsParams = {
      size: theoryMaterialsDTO.size,
      theoryMaterials,
    };

    return allTheoryMaterialsParams;
  }

  /**
   * Update theory material
   */
  public static async updateTheoryMaterial(theoryMaterial: PartialWithUuid<TheoryMaterial>): Promise<TheoryMaterial> {
    const theoryMaterialDTOPartial = theoryMaterialToTheoryMaterialDTOPartial(theoryMaterial);
    const updatedTheoryMaterialDTO = await TheoryMaterialService.updateTheoryMaterial({
      request: theoryMaterialDTOPartial,
      theoryMaterialId: theoryMaterial.uuid,
    });

    const updatedTheoryMaterial = theoryMaterialDTOToTheoryMaterial(updatedTheoryMaterialDTO);

    return updatedTheoryMaterial;
  }

  /**
   * Delete theory material
   */
  public static async deleteTheoryMaterial(theoryMaterialId: string): Promise<void> {
    await TheoryMaterialService.deleteTheoryMaterial({theoryMaterialId});
  }

}
