import {userToUserDTOPartialConverter}
  from "src/dataAccessLogic/BusinessToDTOConverter/userPreviewToUserPreviewDTOPartialConverter";
import {UserDTOToUserNotSaturatedWayConverter}
  from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserNotSaturatedWayConverter";
import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {wayDTOToWayNotSaturatedUserConverter}
  from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayNotSaturatedUserConverter";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";
import {
  WAY_OWNER_UUID_FIELD,
  WAY_UUID_FIELD,
  WayDTO,
} from "src/model/DTOModel/WayDTO";
import {GetUsersParams, UserService} from "src/service/UserService";
import {WayService} from "src/service/WayService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the UserPreview model
 */
export class UserPreviewDAL {

  /**
   * Get amount of all users in collection
   */
  public static async getUsersPreviewAmount(filter: GetUsersParams): Promise<number> {
    return await UserService.getUsersDTOAmount(filter);
  }

  /**
   * Get all UserPreview
   */
  public static async getUsersPreview(params: GetUsersParams): Promise<UserPreview[]> {
    const usersDTO = await UserService.getUsersDTO(params);

    const allNeededWaysRequestsUuids = new Set(usersDTO.flatMap(userDTO => [...userDTO.wayRequestUuids]));

    const allNeededWaysRequestsPreviewDTO = await WayService.getWaysDTOByUuids(Array.from(allNeededWaysRequestsUuids));
    const wayRequestsHashmap = arrayToHashMap({keyField: WAY_UUID_FIELD, list: allNeededWaysRequestsPreviewDTO});

    const wayRequestsSafeHashmap = new SafeMap(wayRequestsHashmap);

    const usersPreviewPromise = usersDTO.map(async (userDTO) => {
      const wayRequestsDTO = userDTO.wayRequestUuids.map((item) => wayRequestsSafeHashmap.getValue(item));
      const wayRequestsPromise = wayRequestsDTO.map(async (wayRequest) => {
        const ownerDTO = await UserService.getUserDTO(wayRequest[WAY_OWNER_UUID_FIELD]);
        const owner: UserNotSaturatedWay = UserDTOToUserNotSaturatedWayConverter(ownerDTO);

        const wayRequestNotSaturatedUser: WayNotSaturatedUser = wayDTOToWayNotSaturatedUserConverter(wayRequest, owner);

        return wayRequestNotSaturatedUser;
      });

      const wayRequests = await Promise.all(wayRequestsPromise);

      return UserDTOToUserPreviewConverter(userDTO, wayRequests);
    });

    const usersPreview = await Promise.all(usersPreviewPromise);

    return usersPreview;
  }

  /**
   * Get UsersPreview by uuids
   */
  public static async getUsersPreviewByUuids(userUuids: string[]): Promise<UserPreview[]> {
    const usersDTO = userUuids.length ? await UserService.getUsersDTOByUuids(userUuids) : [];

    const allNeededWaysRequestsUuids = new Set(usersDTO.flatMap(userDTO => [...userDTO.wayRequestUuids]));

    const allNeededWaysRequestsPreviewDTO = await WayService.getWaysDTOByUuids(Array.from(allNeededWaysRequestsUuids));
    const wayRequestsHashmap = arrayToHashMap({keyField: WAY_UUID_FIELD, list: allNeededWaysRequestsPreviewDTO});

    const wayRequestsSafeHashmap = new SafeMap(wayRequestsHashmap);

    const usersPreviewPromise = usersDTO.map(async (userDTO) => {
      const wayRequestsDTO = userDTO.wayRequestUuids.map((item) => wayRequestsSafeHashmap.getValue(item));
      const wayRequestsPromise = wayRequestsDTO.map(async (wayRequest) => {
        const ownerDTO = await UserService.getUserDTO(wayRequest[WAY_OWNER_UUID_FIELD]);
        const owner: UserNotSaturatedWay = UserDTOToUserNotSaturatedWayConverter(ownerDTO);

        const wayRequestNotSaturatedUser: WayNotSaturatedUser = wayDTOToWayNotSaturatedUserConverter(wayRequest, owner);

        return wayRequestNotSaturatedUser;
      });

      const wayRequests = await Promise.all(wayRequestsPromise);

      return UserDTOToUserPreviewConverter(userDTO, wayRequests);
    });

    const usersPreview = await Promise.all(usersPreviewPromise);

    return usersPreview;
  }

  /**
   * Get User preview by uuid
   */
  public static async getUserPreview(uuid: string): Promise<UserPreview> {
    const userDTO = await UserService.getUserDTO(uuid);

    const waysRequestsPreview = await WayService.getWaysDTOByUuids(userDTO.wayRequestUuids);

    const wayRequestsPromise = waysRequestsPreview.map(async (wayRequest: WayDTO) => {
      const ownerDTO = await UserService.getUserDTO(wayRequest[WAY_OWNER_UUID_FIELD]);

      const owner: UserNotSaturatedWay = UserDTOToUserNotSaturatedWayConverter(ownerDTO);

      const wayRequestNotSaturatedUser: WayNotSaturatedUser = wayDTOToWayNotSaturatedUserConverter(wayRequest, owner);

      return wayRequestNotSaturatedUser;
    });

    const wayRequests = await Promise.all(wayRequestsPromise);

    const userPreview = UserDTOToUserPreviewConverter(userDTO, wayRequests);

    return userPreview;
  }

  /**
   * Update User
   */
  public static async updateUserPreview(userPreviewPartial: PartialWithUuid<UserPreview>) {
    const userPartialDTO = userToUserDTOPartialConverter(userPreviewPartial);
    await UserService.updateUserDTO(userPartialDTO);
  }

}
