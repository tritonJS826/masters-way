import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {useGlobalContext} from "src/GlobalContext";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {Columns} from "src/logic/wayPage/reportsTable/WayColumns";
import {WayStatistic} from "src/logic/wayPage/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {DateUtils} from "src/utils/DateUtils";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way of DayReports
   */
  way: Way;
}

/**
 * Render table with dayReports of specific way
 *
 * TODO:  get rid statistics in this component,
 * move load logic to the parent component and share data with other components
 */
export const DayReportsTable = (props: DayReportsTableProps) => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);
  const [mentors, setMentors] = useState<Map<string, UserPreview>>(new Map());
  const way = props.way;
  const {user} = useGlobalContext();
  const isOwner = user?.uuid === way.owner.uuid;
  const isEmptyWay = dayReports.length === 0;
  const currentDate = DateUtils.getShortISODateValue(new Date());
  const lastReportDate = !isEmptyWay && DateUtils.getShortISODateValue(dayReports[0].createdAt);
  const isReportForTodayAlreadyCreated = lastReportDate === currentDate;
  const isReportForTodayIsNotCreated = isEmptyWay || !isReportForTodayAlreadyCreated;
  const isPossibleCreateDayReport = isOwner && isReportForTodayIsNotCreated;

  /**
   * Create hashmap with mentors and set value to state
   */
  const createHashMapWithMentors = () => {
    const mentorsList = props.way.mentors;
    const mentorsHashMap = new Map(mentorsList.map((item): [string, UserPreview] => [item.uuid, item]));
    setMentors(mentorsHashMap);
  };

  useEffect(() => {
    setDayReports(way.dayReports);
    createHashMapWithMentors();
  }, []);

  /**
   * Create day report
   */
  const createDayReport = async(wayUuid: string, dayReportsData: DayReport[]) => {
    const newDayReport = await DayReportDAL.createDayReport(wayUuid);
    const dayReportsList = [ newDayReport, ...dayReportsData];
    setDayReports(dayReportsList);
  };

  return (
    <>
      <Title
        level={HeadingLevel.h3}
        text="Statistics"
      />
      <WayStatistic dayReports={dayReports} />

      {isPossibleCreateDayReport &&
      <Button
        value="Create new day report"
        onClick={() => createDayReport(way.uuid, dayReports)}
      />
      }

      <ReportsTable
        data={dayReports}
        columns={Columns({dayReports, setDayReports, mentors, way})}
      />
    </>
  );
};
