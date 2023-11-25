import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {Columns} from "src/logic/wayPage/reportsTable/WayColumns";
import {WayStatistic} from "src/logic/wayPage/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way's uuid
   */
  wayUuid: string;
}

/**
 * Render table with dayReports of specific way
 *
 * TODO:  get rid statistics in this component,
 * move load logic to the parent component and share data with other components
 */
export const DayReportsTable = (props: DayReportsTableProps) => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);
  const [mentorsList, setMentorsList] = useState<UserPreview[]>([]);

  /**
   * Gets all day reports
   */
  const loadDayReports = async () => {
    const data = await DayReportDAL.getDayReports(props.wayUuid);
    setDayReports(data);
  };

  /**
   * Load mentors
   */
  const loadMentors = async () => {
    const way = await WayPreviewDAL.getWayPreview(props.wayUuid);
    const mentors = way.currentMentors;
    setMentorsList(mentors);
  };

  useEffect(() => {
    loadDayReports();
    loadMentors();
  }, []);

  const mentors = new Map(mentorsList.map((item): [string, UserPreview] => [item.uuid, item]));

  /**
   * Create day report
   */
  const createDayReport = async(wayUuid: string, dayReportsData: DayReport[]) => {
    const newDayReport = await DayReportDAL.createDayReport(wayUuid);
    const dayReportsList = [...dayReportsData, newDayReport];
    setDayReports(dayReportsList);
  };

  return (
    <>
      {props.wayUuid &&
      <Button
        value="Create new day report"
        onClick={() => createDayReport(props.wayUuid, dayReports)}
      />
      }

      <WayStatistic dayReports={dayReports} />

      <ReportsTable
        data={dayReports}
        columns={Columns({dayReports, setDayReports, mentors})}
      />
    </>
  );
};