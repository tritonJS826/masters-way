import {createColumnHelper} from "@tanstack/react-table";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {useGlobalContext} from "src/GlobalContext";
import {ReportsTableCommentsCell}
  from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableCommentsCell/ReportsTableCommentsCell";
import {ReportsTableDateCell} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableDateCell/ReportsTableDateCell";
import {ReportsTableJobsDoneCell}
  from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableJobsDoneCell/ReportsTableJobsDoneCell";
import {ReportsTablePlansCell} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/ReportsTablePlansCell";
import {ReportsTableProblemsCell}
  from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableProblemsCell/ReportsTableProblemsCell";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";

export const DEFAULT_SUMMARY_TIME = 0;
export const MAX_TIME = 9999;
const columnHelper = createColumnHelper<DayReport>();
const DIFFERENCE_INDEX_LIST_NUMBER = 1;

/**
 * Get time in minutes till {@link MAX_TIME}
 */
export const getValidatedTime = (time: number) => {
  return time <= MAX_TIME
    ? time
    : MAX_TIME;
};

/**
 * Convert index of element to list number
 */
export const getListNumberByIndex = (index: number) => {
  const listNumber = `${index + DIFFERENCE_INDEX_LIST_NUMBER}.${Symbols.NO_BREAK_SPACE}`;

  return listNumber;
};

/**
 * Get all users involved in the {@link way}
 */
const getUsersInWay = (way: Way) => {
  const usersInWay: Map<string, UserPreview> = new Map([
    ...way.mentors.entries(),
    ...way.formerMentors.entries(),
    [way.owner.uuid, way.owner],
  ]);

  return usersInWay;
};

/**
 * Get user name
 */
export const getName = (way: Way, userUuid: string) => {
  const usersInWay = getUsersInWay(way);
  const user = usersInWay.get(userUuid);

  if (!user) {
    throw Error(`User with uuid ${userUuid} is not defined`);
  }

  const firstName = getFirstName(user.name);

  return firstName;
};

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * Callback that change dayReports
   */
  setDayReports: (dayReports: DayReport[] | ((prevDayReports: DayReport[]) => DayReport[])) => void;

  /**
   * Way
   */
  way: Way;

  /**
   * Create new day report
   */
  createDayReport: (wayUuid: string, dayReportUuids: DayReport[]) => Promise<DayReport>;
}

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const {user} = useGlobalContext();
  const ownerUuid = props.way.owner.uuid;
  const isOwner = user?.uuid === ownerUuid;
  const isMentor = !!user && !!user.uuid && props.way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;

  /**
   * Update DayReport
   */
  const updateReport = async (report: PartialWithUuid<DayReport>) => {
    props.setDayReports((prevDayReports: DayReport[]) => {
      const reportToUpdate = prevDayReports.find(dayReport => dayReport.uuid === report.uuid);
      if (!reportToUpdate) {
        throw new Error(`Report with uuid ${report.uuid} is undefined`);
      }

      const updatedReport = new DayReport({...reportToUpdate, ...report});
      const updatedDayReports = prevDayReports.map(dayReport => dayReport.uuid === report.uuid
        ? updatedReport
        : dayReport,
      );

      // TODO await
      DayReportDAL.updateDayReport(updatedReport);

      return updatedDayReports;
    });
  };

  const columns = [
    columnHelper.accessor("createdAt", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="Date, when day report was created"
        >
          Date
        </Tooltip>
      ),

      /**
       * Cell  with date value
       */
      cell: ({row}) => <ReportsTableDateCell date={row.original.createdAt} />,
    }),
    columnHelper.accessor("jobsDone", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="The most specific and decomposed jobs related to this way (in minutes)"
        >
          Jobs done
        </Tooltip>
      ),

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => (
        <ReportsTableJobsDoneCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          jobTags={props.way.jobTags}
          updateDayReport={updateReport}
        />
      ),
    }),
    columnHelper.accessor("plans", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="Plans related to this way (in minutes)"
        >
          Plans
        </Tooltip>
      ),

      /**
       * Cell with Plan items
       */
      cell: ({row}) => (
        <ReportsTablePlansCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          jobTags={props.way.jobTags}
          updateDayReport={updateReport}
          way={props.way}
          createDayReport={props.createDayReport}
          user={user}
        />
      ),
    }),
    columnHelper.accessor("problems", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content="Problems you encountered while completing the task"
        >
          Problems
        </Tooltip>
      ),

      /**
       * Cell with Problems items
       */
      cell: ({row}) => (
        <ReportsTableProblemsCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          updateDayReport={updateReport}
          way={props.way}
          user={user}
        />
      ),
    }),
    columnHelper.accessor("comments", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content="Explanations from the mentor and any information related to completing this path"
        >
          Comments
        </Tooltip>
      ),

      /**
       * Cell with Comments items
       */
      cell: ({row}) => (
        <ReportsTableCommentsCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          updateDayReport={updateReport}
          way={props.way}
          user={user}
        />
      ),
    }),
  ];

  return columns;
};
