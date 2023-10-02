import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {getWaysPreview} from "src/dataAccessLogic/getWaysPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {UserService} from "src/service/UserService";

/**
 * Users preview
 * @returns {Promise<UserPreview[]>}
 */
export const getUsersPreview = async (): Promise<UserPreview[]> => {
  const waysPreview = await getWaysPreview();
  const usersDTO = await UserService.getUsersDTO();

  const firstUser = usersDTO[0];

  const ownWays = firstUser.ownWays.map((ownWayUuid) => {
    const ownWay: WayPreview = waysPreview
      .find((elem) => elem.uuid === ownWayUuid) ?? {} as WayPreview;

    return ownWay;
  });

  const users = usersDTO.map((userPreview) => UserDTOToUserPreviewConverter(userPreview, ownWays));

  return users;
};