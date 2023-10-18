import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {getUsersPreview} from "src/dataAccessLogic/getUsersPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

/**
 * Ways preview
 * @returns {Promise<WayPreview[]>}
 */
export const getWaysPreview = async (): Promise<WayPreview[]> => {
  const waysDTO = await WayService.getWaysDTO();
  const usersPreview = await getUsersPreview();

  const firstWay = waysDTO[0];

  const owner: UserPreview = usersPreview
    .find((elem) => elem.uuid === firstWay.ownerUuid) ?? {} as UserPreview;

  // TODO: this file will be deleted after merge PR #95
  const currentMentors = firstWay.currentMentorUuids.map((currentMentorUuid) => {
    const currentMentor: UserPreview = usersPreview
      .find((elem) => elem.uuid === currentMentorUuid) ?? {} as UserPreview;

    return currentMentor;
  });

  const wayProps = {
    owner,
    currentMentors,
  };

  const ways: WayPreview[] = waysDTO.map((wayPreview) => wayDTOToWayPreviewConverter(wayPreview, wayProps));

  return ways;
};