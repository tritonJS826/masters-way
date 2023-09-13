import {DayReport} from "src/model/businessModel/DayReport";
import {Goal} from "src/model/businessModel/Goal";
import {MonthReport} from "src/model/businessModel/MonthReport";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";
import {DayReportService} from "src/service/DayReportService";
import {GoalService} from "src/service/GoalService";
import {MonthReportService} from "src/service/MonthReportService";
import {UserService} from "src/service/UserService";

const usersRaw = await UserService.getValueFromRealTimeDb();
const dayReportsRaw = await DayReportService.getValueFromRealTimeDb();
const monthReportsRaw = await MonthReportService.getValueFromRealTimeDb();
const goalsRaw = await GoalService.getValueFromRealTimeDb();

export const WayDTOToWayConverter = (wayRaw: WayDTO) => {
  //TODO: get User instead of user.uuid for property owner
  // const user: User = usersRaw.find((elem) => elem.uuid === wayRaw.uuid) || usersRaw[0];

  const dayReports = wayRaw.dayReportUuids?.map((item) => {
    const dayReport: DayReport = dayReportsRaw
      .find((elem) => elem.uuid === item) || dayReportsRaw[0];
    return dayReport;
  });

  const monthReports = wayRaw.monthReportUuids?.map((item) => {
    const monthReport: MonthReport = monthReportsRaw
      .find((elem) => elem.uuid === item) || monthReportsRaw[0];
    return monthReport;
  });

  const goal: Goal = goalsRaw.find((elem) => elem.uuid === wayRaw.goalUuid) || goalsRaw[0];

  const currentMentors = wayRaw.currentMentorUuids?.map((item) => {
    const currentMentor: User = usersRaw
      .find((elem) => elem.uuid === item) || usersRaw[0];
    return currentMentor;
  });

  return new Way({
    ...wayRaw,
    owner: wayRaw.ownerUuid,
    dayReports: dayReports,
    monthReports: monthReports,
    goal: goal,
    currentMentors: currentMentors,
  });
};

