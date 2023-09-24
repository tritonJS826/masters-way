import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {getWaysPreview} from "src/dataAccessLogic/getWaysPreview";
import {UserService} from "src/service/UserService";

const FIRST_INDEX = 0;

export const getUsersPreview = async () => {
  const waysPreview = await getWaysPreview();
  const usersPreview = await UserService.getUsers();

  const ownWays = usersPreview[FIRST_INDEX].ownWays.map((ownWayUuid) => {
    const ownWay = waysPreview
      .find((elem) => elem.uuid === ownWayUuid) || waysPreview[FIRST_INDEX];
    return ownWay;
  });

  const users = usersPreview.map((userPreview) => {
    return UserDTOToUserPreviewConverter(userPreview, ownWays);
  });

  return users;
};