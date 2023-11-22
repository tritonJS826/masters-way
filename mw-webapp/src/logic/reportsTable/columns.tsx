import {createColumnHelper} from "@tanstack/react-table";
import {EditableText} from "src/component/editableText/EditableText";
import {CellItem} from "src/component/table/tableCell/cellItem/CellItem";
import {TableCell} from "src/component/table/tableCell/TableCell";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {renderCellDate} from "src/logic/reportsTable/renderCellItem/renderCellDate";
import {renderCellIsDayOff} from "src/logic/reportsTable/renderCellItem/renderCellIsDayOff";
import {useDayReportsContext} from "src/logic/reportsTable/reportTableContext";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/component/editableText/EditableText.module.scss";

const DEFAULT_SUMMARY_TIME = 0;

/**
 * Update DayReport context
 */
const updateDayReportContext = async (
  dayReportUuid: string,
  dayReports: DayReport[],
  setDayReports: (updatedDayReports: DayReport[]) => void) => {
  const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
  const updatedDayReports = dayReports.map((item) => {
    if (item.uuid === dayReportUuid) {
      return updatedDayReport;
    }

    return item;
  });
  setDayReports(updatedDayReports);
};

const columnHelper = createColumnHelper<DayReport>();

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const columns = [
  columnHelper.accessor("date", {
    header: "Date",

    /**
     * Cell with date value
     */
    cell: (dateValue) => (
      <TableCell>
        {renderCellDate(dateValue)}
      </TableCell>
    ),
  }),
  columnHelper.accessor("jobsDone", {
    header: "Jobs done (minutes)",

    /**
     * Cell with JobsDone items
     */
    cell: ({row}) => {
      const {dayReports, setDayReports} = useDayReportsContext();

      /**
       * Create jobDone
       */
      const createJobDone = async (dayReport: DayReport) => {
        await JobDoneDAL.createJobDone(dayReport);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update jobDone
       */
      const updateJobDone = async (jobDone: JobDone, text: string) => {
        await JobDoneDAL.updateJobDone(jobDone, text);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update jobDoneTime
       */
      const updateJobDoneTime = async (jobDone: JobDone, text: number) => {
        await JobDoneDAL.updateJobDoneTime(jobDone, text);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      return (
        <TableCell
          buttonValue="add job"
          onButtonClick={() => createJobDone(row.original)}
        >
          {row.original.jobsDone
            .map((jobDone) => (
              <CellItem key={jobDone.uuid}>
                <EditableText
                  text={jobDone.description}
                  onChangeFinish={(text) => updateJobDone(jobDone, text)}
                />
                {UnicodeSymbols.DIVIDING_POINT}
                <EditableText
                  text={jobDone.time}
                  onChangeFinish={(text) => updateJobDoneTime(jobDone, text)}
                  className={styles.editableTime}
                />
              </CellItem>
            ),
            )
          }
          <div className={styles.summaryTimeWrapper}>
            {"Summary time: "}
            {row.original.jobsDone
              .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
            }
          </div>
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("plansForNextPeriod", {
    header: "Plans for tomorrow (minutes)",

    /**
     * Cell with PlanForNextPeriod items
     */
    cell: ({row}) => {
      const {dayReports, setDayReports} = useDayReportsContext();

      /**
       * Create PlanForNextPeriod
       */
      const createPlanForNextPeriod = async (dayReport: DayReport) => {
        await PlanForNextPeriodDAL.createPlanForNextPeriod(dayReport);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update PlanForNextPeriod
       */
      const updatePlanForNextPeriod = async (planForNextPeriod: PlanForNextPeriod, text: string) => {
        await PlanForNextPeriodDAL.updatePlanForNextPeriod(planForNextPeriod, text);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update PlanForNextPeriodTime
       */
      const updatePlanForNextPeriodTime = async (planForNextPeriod: PlanForNextPeriod, text: number) => {
        await PlanForNextPeriodDAL.updatePlanForNextPeriodTime(planForNextPeriod, text);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      return (
        <TableCell
          buttonValue="add plan"
          onButtonClick={() => createPlanForNextPeriod(row.original)}
        >
          {row.original.plansForNextPeriod
            .map((planForNextPeriod) => (
              <CellItem key={planForNextPeriod.uuid}>
                <EditableText
                  text={planForNextPeriod.job}
                  onChangeFinish={(text) => updatePlanForNextPeriod(planForNextPeriod, text)}
                />
                {UnicodeSymbols.DIVIDING_POINT}
                <EditableText
                  text={planForNextPeriod.estimationTime}
                  onChangeFinish={(value) => updatePlanForNextPeriodTime(planForNextPeriod, value)}
                  className={styles.editableTime}
                />
              </CellItem>
            ),
            )
          }
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("problemsForCurrentPeriod", {
    header: "Current problems",

    /**
     * Cell with ProblemsForCurrentPeriod items
     */
    cell: ({row}) => {
      const {dayReports, setDayReports} = useDayReportsContext();

      /**
       * Create CurrentProblem
       */
      const createCurrentProblem = async (dayReport: DayReport) => {
        await CurrentProblemDAL.createCurrentProblem(dayReport);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update CurrentProblem
       */
      const updateCurrentProblem = async (currentProblem: CurrentProblem, text: string) => {
        await CurrentProblemDAL.updateCurrentProblem(currentProblem, text);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      return (
        <TableCell
          buttonValue="add problem"
          onButtonClick={() => createCurrentProblem(row.original)}
        >
          {row.original.problemsForCurrentPeriod
            .map((currentProblem) => (
              <CellItem key={currentProblem.uuid}>
                <EditableText
                  text={currentProblem.description}
                  onChangeFinish={(text) => updateCurrentProblem(currentProblem, text)}
                />
              </CellItem>
            ))
          }
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("studentComments", {
    header: "Student comments",

    /**
     * Cell with StudentComments items
     */
    cell: ({row}) => {
      const {dayReports, setDayReports} = useDayReportsContext();

      /**
       * Create StudentComment
       */
      const createStudentComment = async (dayReport: DayReport) => {
        await DayReportDAL.createStudentComment(dayReport);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update StudentComment
       */
      const updateStudentComment = async (dayReport: DayReport, text: string, index: number) => {
        await DayReportDAL.updateStudentComment(dayReport, text, index);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      return (
        <TableCell
          buttonValue="add comment"
          onButtonClick={() => createStudentComment(row.original)}
        >
          {row.original.studentComments
            .map((studentComment, index) => (
              <CellItem key={index}>
                <EditableText
                  text={studentComment}
                  onChangeFinish={(text) => updateStudentComment(row.original, text, index)}
                />
              </CellItem>
            ),
            )}
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("learnedForToday", {
    header: "Learned for today",

    /**
     * Cell with LearnForToday items
     */
    cell: ({row}) => {
      const {dayReports, setDayReports} = useDayReportsContext();

      /**
       * Create LearnForToday
       */
      const createLearnForToday = async (dayReport: DayReport) => {
        await DayReportDAL.createLearnedForToday(dayReport);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update LearnForToday
       */
      const updateLearnForToday = async (dayReportUuid: string, text: string, index: number) => {
        await DayReportDAL.updateLearnedForToday(row.original, text, index);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      return (
        <TableCell
          buttonValue="add learned for today"
          onButtonClick={() => createLearnForToday(row.original)}
        >
          {row.original.learnedForToday
            .map((learnedForTodayItem, index) => (
              <CellItem key={index}>
                <EditableText
                  text={learnedForTodayItem}
                  onChangeFinish={(text) => updateLearnForToday(row.original.uuid, text, index)}
                />
              </CellItem>
            ),
            )}
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("mentorComments", {
    header: "Mentor comments",

    /**
     * Cell with MentorComments items
     */
    cell: ({row}) => {
      const {dayReports, setDayReports} = useDayReportsContext();

      /**
       * Create MentorComment
       */
      const createMentorComment = async (dayReport: DayReport) => {
        await MentorCommentDAL.createMentorComment(dayReport);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      /**
       * Update MentorComment
       */
      const updateMentorComment = async (mentorComment: MentorComment, text: string) => {
        await MentorCommentDAL.updateMentorComment(mentorComment, text);
        updateDayReportContext(row.original.uuid, dayReports, setDayReports);
      };

      return (
        <TableCell
          buttonValue="add comment"
          onButtonClick={() => createMentorComment(row.original)}
        >
          {row.original.mentorComments
            .map((mentorComment) => (
              <CellItem key={mentorComment.uuid}>
                <EditableText
                  text={mentorComment.description}
                  onChangeFinish={(text) => updateMentorComment(mentorComment, text)}
                />
              </CellItem>
            ),
            )}
        </TableCell>
      );
    },
  }),
  columnHelper.accessor("isDayOff", {
    header: "Is day off",

    /**
     * Cell with IsDayOff value
     */
    cell: (isDayOffValue) => (
      <TableCell>
        {renderCellIsDayOff(isDayOffValue)}
      </TableCell>
    )
    ,
  }),
];