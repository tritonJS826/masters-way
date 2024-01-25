import {Timestamp, writeBatch} from "firebase/firestore";
import {wayToWayDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/wayToWayDTOConverter";
import {wayToWayDTOPartialConverter} from "src/dataAccessLogic/BusinessToDTOConverter/wayToWayDTOPartialConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {wayDTOToWayConverter} from "src/dataAccessLogic/DTOToBusinessConverter/wayDTOToWayPreviewConverter";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {userPreviewToUserDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/userPreviewToUserDTOConverter";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {db} from "src/firebase";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {USER_UUID_FIELD} from "src/model/DTOModel/UserDTO";
import {WAY_MENTOR_UUIDS_FIELD, WAY_OWNER_UUID_FIELD} from "src/model/DTOModel/WayDTO";
import {DayReportService} from "src/service/DayReportService";
import {GoalMetricService} from "src/service/GoalMetricService";
import {GoalService} from "src/service/GoalService";
import {UserService} from "src/service/UserService";
import {WayDTOWithoutUuid, WayService} from "src/service/WayService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import {GenericPartialWithUuid} from "src/utils/genericPartialWithUuid";

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

    const allNeededUsersUuids = new Set([
      wayDTO[WAY_OWNER_UUID_FIELD],
      ...wayDTO.favoriteForUserUuids,
      ...wayDTO.formerMentorUuids,
      ...wayDTO[WAY_MENTOR_UUIDS_FIELD],
      ...wayDTO.mentorRequestUuids,
    ]);

    const allNeededUsersPreviewPromise = UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));
    const dayReportsPromise = DayReportDAL.getDayReports(wayDTO.dayReportUuids);

    const [
      allNeededUsersPreview,
      dayReports,
    ] = await Promise.all([
      allNeededUsersPreviewPromise,
      dayReportsPromise,
    ]);

    const usersHashmap = arrayToHashMap({keyField: USER_UUID_FIELD, list: allNeededUsersPreview});

    const usersSafeHashmap = new SafeMap(usersHashmap);

    const owner = usersSafeHashmap.getValue(wayDTO[WAY_OWNER_UUID_FIELD]);
    const mentors = wayDTO.mentorUuids.map((mentorUuid) => usersSafeHashmap.getValue(mentorUuid));
    const mentorRequests = wayDTO.mentorRequestUuids.map((mentorRequestUuid) => usersSafeHashmap.getValue(mentorRequestUuid));
    const formerMentors = wayDTO.formerMentorUuids.map((formerMentorUuid) => usersSafeHashmap.getValue(formerMentorUuid));
    const favoriteForUsers = wayDTO.favoriteForUserUuids.map((userUuid) => usersSafeHashmap.getValue(userUuid));

    const mentorsDictionary = arrayToHashMap({keyField: USER_UUID_FIELD, list: mentors});

    const formerMentorsDictionary = arrayToHashMap({keyField: USER_UUID_FIELD, list: formerMentors});

    const dayReportsOrderedByDate = dayReports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const goal = await GoalDAL.getGoal(wayDTO.goalUuid, owner);

    const lastUpdate = wayDTO.lastUpdate.toDate();
    const createdAt = wayDTO.createdAt.toDate();

    const wayPreviewProps = {
      owner,
      mentors: mentorsDictionary,
      formerMentors: formerMentorsDictionary,
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
   * TODO #407: delete request const user = await UserPreviewDAL.getUserPreview(userUuid); and use user as second param
   * TODO #407: add batch
   */
  public static async createWay(userUuid: string): Promise<Way> {
    const user = await UserPreviewDAL.getUserPreview(userUuid);
    const newGoal = await GoalDAL.createGoal(userUuid);

    const DEFAULT_WAY: WayDTOWithoutUuid = {
      name: `Way of ${user.name}`,
      dayReportUuids: [],
      ownerUuid: `${userUuid}`,
      goalUuid: `${newGoal.uuid}`,
      mentorUuids: [],
      formerMentorUuids: [],
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

    // TODO #407: use converter instead of additional request
    const way = WayDAL.getWay(wayDTO.uuid);

    return way;
  }

  /**
   * Update Way
   */
  public static async updateWay(field: GenericPartialWithUuid<Way>) {
    const wayFieldDTO = wayToWayDTOPartialConverter(field);
    await WayService.updateWayPartialDTO(wayFieldDTO);
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
