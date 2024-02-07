import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {USER_UUID_FIELD} from "src/model/DTOModel/UserDTO";
import {WAY_OWNER_UUID_FIELD} from "src/model/DTOModel/WayDTO";
import {GetWaysFilter, WayService} from "src/service/WayService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";

/**
 * Provides methods to interact with the WayPreview model
 */
export class WayPreviewDAL {

  /**
   * Get amount of all ways in collection
   */
  public static async getWaysPreviewAmount(): Promise<number> {
    return await WayService.getWaysDTOAmount();
  }

  /**
   * Get all WayPreview
   */
  public static async getWaysPreview(lastWayUuid?: string): Promise<WayPreview[]> {
    const waysDTO = await WayService.getWaysDTO(lastWayUuid);

    const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
      wayDTO.ownerUuid,
      ...wayDTO.mentorUuids,
      ...wayDTO.mentorRequestUuids,
    ]));

    const allNeededUsersPreview = await UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));

    const usersHashmap = arrayToHashMap({keyField: USER_UUID_FIELD, list: allNeededUsersPreview});

    const usersSafeHashmap = new SafeMap(usersHashmap);

    const waysPreview = waysDTO.map((wayDTO) => {
      const owner = usersSafeHashmap.getValue(wayDTO[WAY_OWNER_UUID_FIELD]);
      const mentors = wayDTO.mentorUuids.map((item) => usersSafeHashmap.getValue(item));
      const mentorRequests = wayDTO.mentorRequestUuids.map((item) => usersSafeHashmap.getValue(item));

      const wayPreviewProps = {
        owner,
        mentors,
        mentorRequests,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
    });

    return waysPreview;
  }

  /**
   * Get WaysPreview by uuid
   */
  public static async getWaysPreviewByUuids(wayUuids: string[], filter?: GetWaysFilter): Promise<WayPreview[]> {
    const waysDTO = wayUuids.length ? await WayService.getWaysDTOByUuids(wayUuids, filter) : [];

    const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
      wayDTO.ownerUuid,
      ...wayDTO.mentorUuids,
    ]));

    const allNeededUsersPreview = await UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));

    const usersHashmap = arrayToHashMap({keyField: USER_UUID_FIELD, list: allNeededUsersPreview});

    const usersSafeHashmap = new SafeMap(usersHashmap);

    const waysPreview = waysDTO.map((wayDTO) => {
      const owner = usersSafeHashmap.getValue(wayDTO.ownerUuid);
      const mentors = wayDTO.mentorUuids.map((mentorUuid) => usersSafeHashmap.getValue(mentorUuid));

      const wayPreviewProps = {
        owner,
        mentors,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
    });

    return waysPreview;
  }

  /**
   * Get WayPreview
   */
  public static async getWayPreview(uuid: string): Promise<WayPreview> {
    const wayDTO = await WayService.getWayDTO(uuid);

    const ownerPromise = UserPreviewDAL.getUserPreview(wayDTO.ownerUuid);

    const mentorsPromise = Promise.all(wayDTO.mentorUuids.map(UserPreviewDAL.getUserPreview));

    const [
      owner,
      mentors,
    ] = await Promise.all([
      ownerPromise,
      mentorsPromise,
    ]);

    const wayPreviewProps = {
      owner,
      mentors,
    };

    const wayPreview = wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);

    return wayPreview;
  }

}
