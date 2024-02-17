import {userToUserDTOPartialConverter}
  from "src/dataAccessLogic/BusinessToDTOConverter/userPreviewToUserPreviewDTOPartialConverter";
import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";
import {USER_CREATED_AT_FIELD} from "src/model/DTOModel/UserDTO";
import {
  WAY_CREATED_AT_FIELD,
  WAY_LAST_UPDATE_FIELD,
  WAY_MENTOR_UUIDS_FIELD,
  WAY_OWNER_UUID_FIELD,
  WAY_UUID_FIELD,
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
    // Const allNeededWaysRequestsPreview = await WayPreviewDAL.getWaysPreviewByUuids(Array.from(allNeededWaysRequestsUuids));

    const allNeededWaysRequestsPreviewDTO = await WayService.getWaysDTOByUuids(Array.from(allNeededWaysRequestsUuids));
    const wayRequestsHashmap = arrayToHashMap({keyField: WAY_UUID_FIELD, list: allNeededWaysRequestsPreviewDTO});

    const wayRequestsSafeHashmap = new SafeMap(wayRequestsHashmap);

    const usersPreviewPromise = usersDTO.map(async (userDTO) => {
      const wayRequestsDTO = userDTO.wayRequestUuids.map((item) => wayRequestsSafeHashmap.getValue(item));
      const wayRequestsPromise = wayRequestsDTO.map(async (item) => {
        const ownerDTO = await UserService.getUserDTO(item[WAY_OWNER_UUID_FIELD]);
        const owner: UserNotSaturatedWay = new UserNotSaturatedWay({
          ...ownerDTO,
          ownWays: ownerDTO.ownWayUuids,
          favoriteWays: ownerDTO.favoriteWayUuids,
          mentoringWays: ownerDTO.mentoringWayUuids,
          tags: ownerDTO.tagsStringified.map((tag) => JSON.parse(tag)),
          wayRequests: ownerDTO.wayRequestUuids,
          createdAt: ownerDTO[USER_CREATED_AT_FIELD].toDate(),
          customWayCollections: ownerDTO.customWayCollectionsStringified.map((customWay) => JSON.parse(customWay)),
        });

        const convertedItem: WayNotSaturatedUser = {
          ...item,
          owner,
          mentors: item[WAY_MENTOR_UUIDS_FIELD],
          mentorRequests: item.mentorRequestUuids,
          createdAt: item[WAY_CREATED_AT_FIELD].toDate(),
          lastUpdate: item[WAY_LAST_UPDATE_FIELD].toDate(),
        };

        return convertedItem;
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
    // Const allNeededWaysRequestsPreview = await WayPreviewDAL.getWaysPreviewByUuids(Array.from(allNeededWaysRequestsUuids));

    const allNeededWaysRequestsPreviewDTO = await WayService.getWaysDTOByUuids(Array.from(allNeededWaysRequestsUuids));
    const wayRequestsHashmap = arrayToHashMap({keyField: WAY_UUID_FIELD, list: allNeededWaysRequestsPreviewDTO});

    const wayRequestsSafeHashmap = new SafeMap(wayRequestsHashmap);

    const usersPreviewPromise = usersDTO.map(async (userDTO) => {
      const wayRequestsDTO = userDTO.wayRequestUuids.map((item) => wayRequestsSafeHashmap.getValue(item));
      const wayRequestsPromise = wayRequestsDTO.map(async (item) => {
        const ownerDTO = await UserService.getUserDTO(item[WAY_OWNER_UUID_FIELD]);
        const owner: UserNotSaturatedWay = new UserNotSaturatedWay({
          ...ownerDTO,
          ownWays: ownerDTO.ownWayUuids,
          favoriteWays: ownerDTO.favoriteWayUuids,
          mentoringWays: ownerDTO.mentoringWayUuids,
          tags: ownerDTO.tagsStringified.map((tag) => JSON.parse(tag)),
          wayRequests: ownerDTO.wayRequestUuids,
          createdAt: ownerDTO[USER_CREATED_AT_FIELD].toDate(),
          customWayCollections: ownerDTO.customWayCollectionsStringified.map((customWay) => JSON.parse(customWay)),
        });

        const convertedItem: WayNotSaturatedUser = {
          ...item,
          owner,
          mentors: item[WAY_MENTOR_UUIDS_FIELD],
          mentorRequests: item.mentorRequestUuids,
          createdAt: item[WAY_CREATED_AT_FIELD].toDate(),
          lastUpdate: item[WAY_LAST_UPDATE_FIELD].toDate(),
        };

        return convertedItem;
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

    // Const waysRequestsPreview = await WayPreviewDAL.getWaysPreviewByUuids(userDTO.wayRequestUuids);

    const waysRequestsPreview = await WayService.getWaysDTOByUuids(userDTO.wayRequestUuids);

    const wayRequestsPromise = waysRequestsPreview.map(async (item) => {
      const ownerDTO = await UserService.getUserDTO(item[WAY_OWNER_UUID_FIELD]);
      const owner: UserNotSaturatedWay = new UserNotSaturatedWay({
        ...ownerDTO,
        ownWays: ownerDTO.ownWayUuids,
        favoriteWays: ownerDTO.favoriteWayUuids,
        mentoringWays: ownerDTO.mentoringWayUuids,
        tags: ownerDTO.tagsStringified.map((tag) => JSON.parse(tag)),
        wayRequests: ownerDTO.wayRequestUuids,
        createdAt: ownerDTO[USER_CREATED_AT_FIELD].toDate(),
        customWayCollections: ownerDTO.customWayCollectionsStringified.map((customWay) => JSON.parse(customWay)),
      });

      const convertedItem: WayNotSaturatedUser = {
        ...item,
        owner,
        mentors: item[WAY_MENTOR_UUIDS_FIELD],
        mentorRequests: item.mentorRequestUuids,
        createdAt: item[WAY_CREATED_AT_FIELD].toDate(),
        lastUpdate: item[WAY_LAST_UPDATE_FIELD].toDate(),
      };

      return convertedItem;
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
