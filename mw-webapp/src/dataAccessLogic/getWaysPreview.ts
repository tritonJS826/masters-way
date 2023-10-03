import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {getUsersPreview} from "src/dataAccessLogic/getUsersPreview";
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

  const owner = usersPreview
    .find((elem) => elem.uuid === firstWay.ownerUuid);

  if (!owner) {
    throw new Error(`owner not found for UUID ${firstWay.ownerUuid}`);
  }

  const currentMentors = firstWay.currentMentors.map((currentMentorUuid) => {
    const currentMentor = usersPreview
      .find((elem) => elem.uuid === currentMentorUuid);

    if (!currentMentor) {
      throw new Error(`currentMentor not found for UUID ${currentMentorUuid}`);
    }

    return currentMentor;
  });

  const wayProps = {
    owner,
    currentMentors,
  };

  const ways: WayPreview[] = waysDTO.map((wayPreview) => wayDTOToWayPreviewConverter(wayPreview, wayProps));

  return ways;
};