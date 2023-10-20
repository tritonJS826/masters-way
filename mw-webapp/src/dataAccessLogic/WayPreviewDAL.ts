import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

/**
 * Provides methods to interact with the WayPreview model
 */
export class WayPreviewDAL {

  /**
   * Get all WayPreview
   */
  public static async getWaysPreview(): Promise<WayPreview[]> {
    const waysDTO = await WayService.getWaysDTO();
    const usersPreview = await UserPreviewDAL.getUsersPreview();
    const goalsPreview = await GoalPreviewDAL.getGoalsPreview();

    const ownersPreview = waysDTO.map((wayDTO) => {
      const ownerPreview = usersPreview
        .find((elem) => elem.uuid === wayDTO.ownerUuid);
      if (!ownerPreview) {
        throw new Error(`${ownerPreview} was not found`);
      }

      return ownerPreview;
    });

    /**
     * Get currentMentors from currentMentorUuids for each way
     */
    const currentMentorsPreview = waysDTO.map((wayDTO) => {
      const currentMentorPreview = wayDTO.currentMentorUuids.map((uuid: string) => {
        const mentorsPreview = usersPreview
          //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === uuid);
        if (!mentorsPreview) {
          throw new Error(`${mentorsPreview} was not found`);
        }

        return mentorsPreview;
      });

      return currentMentorPreview;
    });

    const goals = waysDTO.map((wayDTO) => {
      const goalPreview = goalsPreview
        .find((elem) => elem.uuid === wayDTO.goalUuid);
      if (!goalPreview) {
        throw new Error(`${goalPreview} was not found`);
      }

      return goalPreview;
    });

    /**
     * WayPreviewProps for each way separately
     */
    const getWayPreviewProps = (i: number) => {
      const obj = {
        owner: ownersPreview[i],
        currentMentors: currentMentorsPreview[i],
        goal: goals[i],
      };

      return obj;
    };

    const waysPreview = waysDTO
      .map((wayDTO, i) => wayDTOToWayPreviewConverter(wayDTO, getWayPreviewProps(i)));

    return waysPreview;
  }

  /**
   * Get Ways preview owned by User
   */
  public static async getOwnedWaysPreview(uuid: string): Promise<WayPreview[]> {
    const waysDTO = await WayService.getOwnedWaysDTO(uuid);
    const usersPreview = await UserPreviewDAL.getUsersPreview();
    const goalsPreview = await GoalPreviewDAL.getGoalsPreview();

    const ownersPreview = waysDTO.map((wayDTO) => {
      const ownerPreview = usersPreview
        .find((elem) => elem.uuid === wayDTO.ownerUuid);
      if (!ownerPreview) {
        throw new Error(`${ownerPreview} was not found`);
      }

      return ownerPreview;
    });

    /**
     * Get currentMentors from currentMentorUuids for each way
     */
    const currentMentorsPreview = waysDTO.map((wayDTO) => {
      const currentMentorPreview = wayDTO.currentMentorUuids.map((userUuid: string) => {
        const mentorsPreview = usersPreview
          //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === userUuid);
        if (!mentorsPreview) {
          throw new Error(`${mentorsPreview} was not found`);
        }

        return mentorsPreview;
      });

      return currentMentorPreview;
    });

    const goals = waysDTO.map((wayDTO) => {
      const goalPreview = goalsPreview
        .find((elem) => elem.uuid === wayDTO.goalUuid);
      if (!goalPreview) {
        throw new Error(`${goalPreview} was not found`);
      }

      return goalPreview;
    });

    /**
     * WayPreviewProps for each way separately
     */
    const getWayPreviewProps = (i: number) => {
      const obj = {
        owner: ownersPreview[i],
        currentMentors: currentMentorsPreview[i],
        goal: goals[i],
      };

      return obj;
    };

    const waysPreview = waysDTO
      .map((wayDTO, i) => wayDTOToWayPreviewConverter(wayDTO, getWayPreviewProps(i)));

    return waysPreview;
  }

}