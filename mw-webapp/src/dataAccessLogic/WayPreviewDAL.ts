import {wayDTOToWayPreview} from "src/DAL/DTOToPreviewConverter/wayDTOToWayPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
// Import {WAY_OWNER_UUID_FIELD} from "src/model/DTOModel/WayDTO";
import {GetWaysFilter, GetWaysParams} from "src/service/WayService";
import {MetricService} from "src/serviceUpdated/MetricService";
import {WayService} from "src/serviceUpdated/WayService";
// Import {wayService} from "src/serviceUpdated/services";

/**
 * Provides methods to interact with the WayPreview model
 */
export class WayPreviewDAL {

  /**
   * Get amount of all ways in collection
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static async getWaysPreviewAmount(filter?: GetWaysFilter): Promise<number> {
    return (await WayService.getAllWays()).size;
  }

  /**
   * Get all WayPreview
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static async getWaysPreview(params: GetWaysParams): Promise<WayPreview[]> {
    const waysDTO = await WayService.getAllWays();
    const waysPreview = await Promise.all(waysDTO.ways.map(async (wayDTO) => {
      const metrics = await MetricService.getMetrics({wayId: wayDTO.uuid});

      const wayPreview = wayDTOToWayPreview(wayDTO, metrics);

      return wayPreview;
    }));

    return waysPreview;
  }

  // /**
  //  * Get WaysPreview by uuid
  //  */
  // public static async getWaysPreviewByUuids(wayUuids: string[], filter?: GetWaysFilter): Promise<WayPreview[]> {
  //   const waysDTO = wayUuids.length ? await WayService.getWaysDTOByUuids(wayUuids, filter) : [];

  //   // Const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
  //   //   wayDTO.ownerUuid,
  //   //   ...wayDTO.mentorUuids,
  //   // ]));

  //   const allNeededUsersPreview = await UserDAL.getUsers();

  //   const usersHashmap = arrayToHashMap({keyField: USER_UUID_FIELD, list: allNeededUsersPreview});

  //   const usersSafeHashmap = new SafeMap(usersHashmap);

  //   const waysPreview = waysDTO.map((wayDTO) => {
  //     const owner = usersSafeHashmap.getValue(wayDTO.ownerUuid);
  //     const mentors = wayDTO.mentorUuids.map((mentorUuid) => usersSafeHashmap.getValue(mentorUuid));

  //     const wayPreviewProps = {
  //       owner,
  //       mentors,
  //     };

  //     return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
  //   });

  //   return waysPreview;
  // }

}
