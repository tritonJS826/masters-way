import {wayToWayDTOPartial} from "src/dataAccessLogic/BusinessToDTOConverter/wayToWayDTOPartial";
import {wayDTOToWay} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWay";
import {wayDTOToWayPreview} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreview";
import {wayPlainDTOToWayPreview} from "src/dataAccessLogic/DTOToPreviewConverter/wayPlainDTOToWayPreview";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {GetWaysParams, WayService} from "src/service/WayService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

export const WAY_NAME_FIELD = "name";
export const WAY_TAGS_FIELD = "wayTags";
export const WAY_JOB_TAGS_FIELD = "jobTags";
export const WAY_COPIED_FROM_WAY_UUID_FIELD = "copiedFromWayUuid";
export const WAY_GOAL_DESCRIPTION_FIELD = "goalDescription";
export const WAY_ESTIMATION_TIME_FIELD = "estimationTime";
export const WAY_METRICS_FIELD = "metrics";

/**
 * Way props without uuid
 */
export type WayWithoutUuid = Omit<Way, "uuid">;

export type BaseWayData = Pick<WayWithoutUuid,
  typeof WAY_NAME_FIELD
| typeof WAY_TAGS_FIELD
| typeof WAY_JOB_TAGS_FIELD
| typeof WAY_COPIED_FROM_WAY_UUID_FIELD
| typeof WAY_GOAL_DESCRIPTION_FIELD
| typeof WAY_ESTIMATION_TIME_FIELD
| typeof WAY_METRICS_FIELD
>

/**
 * All ways params
 */
export interface AllWaysParams {

  /**
   * Ways amount
   */
  size: number;

  /**
   * Array of way preview
   */
  waysPreview: WayPreview[];
}

/**
 * Provides methods to interact with the Way model
 */
export class WayDAL {

  /**
   * Get all WayPreview
   */
  public static async getWays(params?: GetWaysParams): Promise<AllWaysParams> {
    const waysDTO = await WayService.getAllWays(params);

    const waysPreview = waysDTO.ways.map(wayPlainDTOToWayPreview);

    const ways = {
      size: waysDTO.size,
      waysPreview,
    };

    return ways;

  }

  /**
   * Get WayPreview
   */
  public static async getWay(uuid: string): Promise<Way> {
    const wayDTO = await WayService.getWayByUuid({wayId: uuid});
    const way = wayDTOToWay(wayDTO);

    return way;
  }

  /**
   * Create Way with empty fields and autogenerated uuid
   */
  public static async createWay(user: User, baseWayData?: BaseWayData): Promise<WayPreview> {
    const wayDTO = await WayService.createWay({
      request: {
        copiedFromWayUuid: baseWayData?.copiedFromWayUuid ?? "",
        estimationTime: baseWayData?.estimationTime ?? 0,
        goalDescription: baseWayData?.goalDescription ?? "",
        isPrivate: false,
        name: `Way of ${user.name}`,
        ownerUuid: `${user.uuid}`,
        isCompleted: false,
      },
    });

    const way = wayDTOToWayPreview(wayDTO);

    return way;
  }

  /**
   * Update Way
   */
  public static async updateWay(way: PartialWithUuid<Way>) {
    const wayDTOPartial = wayToWayDTOPartial(way);
    await WayService.updateWay({
      wayId: way.uuid,
      request: wayDTOPartial,
    });
  }

  /**
   * Delete Way
   */
  public static async deleteWay(wayUuid: string) {
    await WayService.deleteWay({wayId: wayUuid});
  }

}
