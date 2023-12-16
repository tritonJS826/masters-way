import {DayReport} from "src/model/businessModel/DayReport";
import {Goal} from "src/model/businessModel/Goal";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayDTO} from "src/model/DTOModel/WayDTO";

/**
 * Way props
 */
interface WayProps {

  /**
   * Way's creator
   */
  owner: UserPreview;

  /**
   * Way's current mentors
   */
  mentors: UserPreview[];

  /**
   * Users who sent request to become Way's mentor
   */
  mentorRequests: UserPreview[];

  /**
   * Way's goal
   */
  goal: Goal;

  /**
   * Last day when way was updated in ms
   */
  lastUpdate: Date;

  /**
   * Date when way was created in ms
   */
  createdAt: Date;

  /**
   * Day reports
   */
  dayReports: DayReport[];

  /**
   * Favorite for users
   */
  favoriteForUsers: UserPreview[];
}

/**
 * Convert {@link WayDTO} to {@link Way}
 */
export const wayDTOToWayConverter = (wayDTO: WayDTO, wayProps: WayProps): Way => {
  return new Way({
    ...wayDTO,
    uuid: wayDTO.uuid,
    name: wayDTO.name,
    dayReports: wayProps.dayReports,
    owner: wayProps.owner,
    goal: wayProps.goal,
    mentors: wayProps.mentors,
    mentorRequests: wayProps.mentorRequests,
    isCompleted: wayDTO.isCompleted,
    lastUpdate: wayProps.lastUpdate,
    favoriteForUsers: wayProps.favoriteForUsers,
    createdAt: wayProps.createdAt,
  });
};
