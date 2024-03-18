// Import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
// import {USER_CREATED_AT_FIELD, UserDTO} from "src/model/DTOModel/UserDTO";

// /**
//  * Convert {@link UserDTO} to {@link UserPreview}
//  */
// export const UserDTOToUserNotSaturatedWayConverter = (userDTO: UserDTO): UserNotSaturatedWay => {
//   return new UserNotSaturatedWay({
//     ...userDTO,
//     ownWays: userDTO.ownWayUuids,
//     favoriteWays: userDTO.favoriteWayUuids,
//     mentoringWays: userDTO.mentoringWayUuids,
//     tags: userDTO.tagsStringified.map((tag) => JSON.parse(tag)),
//     wayRequests: userDTO.wayRequestUuids,
//     createdAt: userDTO[USER_CREATED_AT_FIELD].toDate(),
//     customWayCollections: userDTO.customWayCollectionsStringified.map((customWay) => JSON.parse(customWay)),
//   });
// };
