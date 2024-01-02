import {Timestamp, writeBatch} from "firebase/firestore";
import {wayToWayDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/wayToWayDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {wayDTOToWayConverter} from "src/dataAccessLogic/DTOToBusinessConverter/wayDTOToWayPreviewConverter";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {userPreviewToUserDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/userPreviewToUserDTOConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {db} from "src/firebase";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {DayReportService} from "src/service/DayReportService";
import {GoalMetricService} from "src/service/GoalMetricService";
import {GoalService} from "src/service/GoalService";
import {UserService} from "src/service/UserService";
import {WayDTOWithoutUuid, WayService} from "src/service/WayService";
import {arrayToHashMap} from "src/utils/createHashMap";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Provides methods to interact with the Way model
 */
export class WayDAL {

  /**
   * Get all WayPreview
   */
  public static async getWays(): Promise<Way[]> {
    const waysDTO = await WayService.getWaysDTO();
    const waysUuids = waysDTO.map((item) => item.uuid);

    const waysPreview = await Promise.all(waysUuids.map(WayDAL.getWay));

    return waysPreview;
  }

  /**
   * Get WayPreview
   */
  public static async getWay(uuid: string): Promise<Way> {
    const wayDTO = await WayService.getWayDTO(uuid);

    const ownerPromise = UserPreviewDAL.getUserPreview(wayDTO.ownerUuid);

    const mentorsPromise = Promise.all(wayDTO.mentorUuids.map(UserPreviewDAL.getUserPreview));

    const mentorRequestsPromise = Promise.all(wayDTO.mentorRequestUuids.map(UserPreviewDAL.getUserPreview));

    const dayReportsPromise = Promise.all(wayDTO.dayReportUuids.map(DayReportDAL.getDayReport));

    const favoriteForUsersPromise = Promise.all(wayDTO.favoriteForUserUuids.map(UserPreviewDAL.getUserPreview));

    const [
      owner,
      mentors,
      mentorRequests,
      dayReports,
      favoriteForUsers,
    ] = await Promise.all([
      ownerPromise,
      mentorsPromise,
      mentorRequestsPromise,
      dayReportsPromise,
      favoriteForUsersPromise,
    ]);

    const mentorsDictionary = arrayToHashMap(mentors);

    const dayReportsOrderedByDate = dayReports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const goal = await GoalDAL.getGoal(wayDTO.goalUuid, owner);

    const lastUpdate = wayDTO.lastUpdate.toDate();
    const createdAt = wayDTO.createdAt.toDate();

    const wayPreviewProps = {
      owner,
      mentors: mentorsDictionary,
      dayReports: dayReportsOrderedByDate,
      mentorRequests,
      goal,
      lastUpdate,
      createdAt,
      favoriteForUsers,
    };

    const way = wayDTOToWayConverter(wayDTO, wayPreviewProps);

    return way;
  }

  /**
   * Create Way with empty fields and autogenerated uuid
   */
  public static async createWay(userUuid: string): Promise<Way> {
    const user = await UserPreviewDAL.getUserPreview(userUuid);
    const newGoal = await GoalDAL.createGoal(userUuid);

    const DEFAULT_WAY: WayDTOWithoutUuid = {
      name: `${DateUtils.getShortISODateValue(new Date)} Way of ${user.name}`,
      dayReportUuids: [],
      ownerUuid: `${userUuid}`,
      goalUuid: `${newGoal.uuid}`,
      mentorUuids: [],
      mentorRequestUuids: [],
      isCompleted: false,
      lastUpdate: Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
      favoriteForUserUuids: [],
      wayTags: [],
      jobTags: [],
    };
    const wayDTO = await WayService.createWayDTO(DEFAULT_WAY);

    const updatedUser = new UserPreview({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      description: user.description,
      ownWays: [...user.ownWays, wayDTO.uuid],
      favoriteWays: user.favoriteWays,
      mentoringWays: user.mentoringWays,
      createdAt: user.createdAt,
    });

    await UserPreviewDAL.updateUserPreview(updatedUser);

    const way = WayDAL.getWay(wayDTO.uuid);

    return way;
  }

  /**
   * Get User ways preview based of provided type
   * TODO: get rid of this functions it is dangerous to use this kind of polymorphism
   */
  public static async getUserWaysPreview(uuid: string, type: "Own" | "Mentoring" | "Favorite"): Promise<Way[]> {
    let waysDTO;

    switch (type) {
      case "Own":
        waysDTO = await WayService.getOwnWaysDTO(uuid);
        break;
      case "Mentoring":
        waysDTO = await WayService.getMentoringWaysDTO(uuid);
        break;
      case "Favorite":
        waysDTO = await WayService.getFavoriteWaysDTO(uuid);
        break;
    }

    const waysUuids = waysDTO.map((item) => item.uuid);

    const ways = await Promise.all(waysUuids.map(WayDAL.getWay));

    return ways;
  }

  /**
   * Update Way
   */
  public static async updateWay(way: Way) {
    const wayDTO = wayToWayDTOConverter(way);
    await WayService.updateWayDTO(wayDTO);
  }

  /**
   * Updates favorites for user and way.
   */
  public static async updateWayWithUser(
    updatedWay: Way,
    updatedUser: UserPreview,
  ): Promise<void> {
    const batch = writeBatch(db);

    const updatedWayDTO = wayToWayDTOConverter(updatedWay);
    const updatedUserDTO = userPreviewToUserDTOConverter(updatedUser);

    const updateWayPromise = WayService.updateWayDTOWithBatch(updatedWayDTO, batch);
    const updateUserPromise = UserService.updateUserDTOWithBatch(updatedUserDTO, batch);

    Promise.all([updateWayPromise, updateUserPromise]);

    await batch.commit();
  }

  /**
   * Delete Way
   */
  public static async deleteWay(way: Way) {
    const batch = writeBatch(db);

    const dayReportsForDelete = way.dayReports;
    const mentorsForDelete = way.mentors;
    const favoriteForUsersForDelete = way.favoriteForUsers;
    const ownWaysForDelete = way.owner.ownWays;
    const favoriteWaysForDelete = way.owner.favoriteWays;

    const updatedOwner = new UserPreview({
      ...way.owner,
      ownWays: ownWaysForDelete.filter((ownWay) => ownWay !== way.uuid),
      favoriteWays: favoriteWaysForDelete.filter((ownWay) => ownWay !== way.uuid),
    });
    const updatedOwnerDTO = userPreviewToUserDTOConverter(updatedOwner);
    UserService.updateUserDTOWithBatch(updatedOwnerDTO, batch);

    mentorsForDelete.forEach((mentor) => {
      const updatedMentor = new UserPreview({
        ...mentor,
        mentoringWays: mentor.mentoringWays.filter((mentoringWay) => mentoringWay !== way.uuid),
      });
      const updatedMentorDTO = userPreviewToUserDTOConverter(updatedMentor);
      UserService.updateUserDTOWithBatch(updatedMentorDTO, batch);
    });

    favoriteForUsersForDelete.forEach((favoriteForUser) => {
      const updatedFavoriteForUser = new UserPreview({
        ...favoriteForUser,
        favoriteWays: favoriteForUser.favoriteWays.filter((favoriteWay) => favoriteWay !== way.uuid),
      });
      const updatedFavoriteForUserDTO = userPreviewToUserDTOConverter(updatedFavoriteForUser);
      UserService.updateUserDTOWithBatch(updatedFavoriteForUserDTO, batch);
    });

    dayReportsForDelete.forEach((dayReport) => DayReportService.deleteDayReportDTOWithBatch(dayReport.uuid, batch));

    GoalMetricService.deleteGoalMetricsDTOWithBatch(way.goal.metrics[0].uuid, batch);
    GoalService.deleteGoalDTOWithBatch(way.goal.uuid, batch);
    WayService.deleteWayDTOWithBatch(way.uuid, batch);

    await batch.commit();
  }

}
