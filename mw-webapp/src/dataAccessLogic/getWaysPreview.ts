import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {getUsersPreview} from "src/dataAccessLogic/getUsersPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

const FIRST_INDEX = 0;

export const getWaysPreview = async () => {
  const waysPreview = await WayService.getWays();
  const usersPreview = await getUsersPreview();

  const owner: UserPreview = usersPreview
    .find((elem) => elem.uuid === waysPreview[FIRST_INDEX].ownerUuid) || usersPreview[FIRST_INDEX];

  const currentMentors = waysPreview[FIRST_INDEX].currentMentors.map((currentMentorUuid) => {
    const currentMentor: UserPreview = usersPreview
      .find((elem) => elem.uuid === currentMentorUuid) || {} as UserPreview;
    return currentMentor;
  });

  const ways: WayPreview[] = waysPreview.map((wayPreview) => {
    return wayDTOToWayPreviewConverter(wayPreview, owner, currentMentors);
  });

  return ways;
};