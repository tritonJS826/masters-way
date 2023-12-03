import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {Columns} from "src/logic/wayPage/reportsTable/WayColumns";
import {WayStatistic} from "src/logic/wayPage/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way of DayReports
   */
  way: WayPreview;
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

  /**
   * Gets all day reports
   */
  const loadDayReports = async () => {
    const data = await DayReportDAL.getDayReports(props.way.uuid);
    setDayReports(data);
  };

  /**
   * Load mentors
   */
  const loadMentors = () => {
    const mentorsList = props.way.currentMentors;
    const mentorsHashMap = new Map(mentorsList.map((item): [string, UserPreview] => [item.uuid, item]));
    setMentors(mentorsHashMap);
  };

  useEffect(() => {
    loadDayReports();
    loadMentors();
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
      {way.uuid &&
      <Button
        value="Create new day report"
        onClick={() => createDayReport(way.uuid, dayReports)}
      />
      }

      <Title
        level={HeadingLevel.h3}
        text="Statistics"
      />
      <WayStatistic dayReports={dayReports} />

      <ReportsTable
        data={dayReports}
        columns={Columns({dayReports, setDayReports, mentors, way})}
      />
    </>
  );
};