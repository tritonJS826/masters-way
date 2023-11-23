import {createColumnHelper} from "@tanstack/react-table";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {CellItem} from "src/component/table/tableCell/cellItem/CellItem";
import {TableCell} from "src/component/table/tableCell/TableCell";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {renderCellDate} from "src/logic/reportsTable/renderCellItem/renderCellDate";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/component/editableText/EditableText.module.scss";

const DEFAULT_SUMMARY_TIME = 0;
const columnHelper = createColumnHelper<DayReport>();

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * DayReports
   */
  dayReports: DayReport[];

  /**
   * Callback that change dayReports
   */
  setDayReports: (dayReports: DayReport[]) => void;
}

/**
 * Update DayReport state
 */
const updateDayReportState = (
  dayReports: DayReport[],
  setReports: (dayReports: DayReport[]) => void,
  updatedDayReport: DayReport) => {
  const updatedDayReports = dayReports.map((item) => {
    if (item.uuid === updatedDayReport.uuid) {
      return updatedDayReport;
    }

    return item;
  });

  setReports(updatedDayReports);
};

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const columns = [
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

        /**
         * Create jobDone
         */
        const createJobDone = async () => {
          const jobDone = await JobDoneDAL.createJobDone(row.original);
          const jobsDone = [...row.original.jobsDone, jobDone];
          const updatedDayReport = {...row.original, jobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update jobDone
         */
        const updateJobDone = async (jobDone: JobDone, text: string) => {
          await JobDoneDAL.updateJobDone(jobDone, text);
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            if (item.uuid === jobDone.uuid) {
              return new JobDone({
                ...jobDone,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, jobsDone: updatedJobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update jobDoneTime
         */
        const updateJobDoneTime = async (jobDone: JobDone, text: number) => {
          await JobDoneDAL.updateJobDoneTime(jobDone, text);
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            if (item.uuid === jobDone.uuid) {
              return new JobDone({
                ...jobDone,
                time: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, jobsDone: updatedJobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <TableCell
            buttonValue="add job"
            onButtonClick={() => createJobDone()}
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

        /**
         * Create PlanForNextPeriod
         */
        const createPlanForNextPeriod = async () => {
          const planForNextPeriod = await PlanForNextPeriodDAL.createPlanForNextPeriod(row.original);
          const plansForNextPeriod = [...row.original.plansForNextPeriod, planForNextPeriod];
          const updatedDayReport = {...row.original, plansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update PlanForNextPeriod
         */
        const updatePlanForNextPeriod = async (planForNextPeriod: PlanForNextPeriod, text: string) => {
          await PlanForNextPeriodDAL.updatePlanForNextPeriod(planForNextPeriod, text);
          const updatedPlansForNextPeriod = row.original.plansForNextPeriod.map((item) => {
            if (item.uuid === planForNextPeriod.uuid) {
              return new PlanForNextPeriod({
                ...planForNextPeriod,
                job: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, plansForNextPeriod: updatedPlansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update PlanForNextPeriodTime
         */
        const updatePlanForNextPeriodTime = async (planForNextPeriod: PlanForNextPeriod, text: number) => {
          await PlanForNextPeriodDAL.updatePlanForNextPeriodTime(planForNextPeriod, text);
          const updatedPlansForNextPeriod = row.original.plansForNextPeriod.map((item) => {
            if (item.uuid === planForNextPeriod.uuid) {
              return new PlanForNextPeriod({
                ...planForNextPeriod,
                estimationTime: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, plansForNextPeriod: updatedPlansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <TableCell
            buttonValue="add plan"
            onButtonClick={() => createPlanForNextPeriod()}
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

        /**
         * Create CurrentProblem
         */
        const createCurrentProblem = async () => {
          const currentProblem = await CurrentProblemDAL.createCurrentProblem(row.original);
          const currentProblems = [...row.original.problemsForCurrentPeriod, currentProblem];
          const updatedDayReport = {...row.original, problemsForCurrentPeriod: currentProblems};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update CurrentProblem
         */
        const updateCurrentProblem = async (currentProblem: CurrentProblem, text: string) => {
          await CurrentProblemDAL.updateCurrentProblem(currentProblem, text);
          const updatedCurrentProblems = row.original.problemsForCurrentPeriod.map((item) => {
            if (item.uuid === currentProblem.uuid) {
              return new CurrentProblem({
                ...currentProblem,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, problemsForCurrentPeriod: updatedCurrentProblems};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <TableCell
            buttonValue="add problem"
            onButtonClick={() => createCurrentProblem()}
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

        /**
         * Create StudentComment
         */
        const createStudentComment = async () => {
          await DayReportDAL.createStudentComment(row.original);
          const studentComments = [...row.original.studentComments, UnicodeSymbols.ZERO_WIDTH_SPACE];
          const updatedDayReport = {...row.original, studentComments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update StudentComment
         */
        const updateStudentComment = async (text: string, index: number) => {
          await DayReportDAL.updateStudentComment(row.original, text, index);
          const updatedStudentComments = row.original.studentComments.map((item, i) => {
            if (i === index) {
              return text;
            }

            return item;
          });

          const updatedDayReport = {...row.original, studentComments: updatedStudentComments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <TableCell
            buttonValue="add comment"
            onButtonClick={() => createStudentComment()}
          >
            {row.original.studentComments
              .map((studentComment, index) => (
                <CellItem key={index}>
                  <EditableText
                    text={studentComment}
                    onChangeFinish={(text) => updateStudentComment(text, index)}
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

        /**
         * Create LearnForToday
         */
        const createLearnForToday = async () => {
          await DayReportDAL.createLearnedForToday(row.original);
          const learnedForToday = [...row.original.learnedForToday, UnicodeSymbols.ZERO_WIDTH_SPACE];
          const updatedDayReport = {...row.original, learnedForToday};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update LearnForToday
         */
        const updateLearnForToday = async (text: string, index: number) => {
          await DayReportDAL.updateLearnedForToday(row.original, text, index);
          const updatedLearnedForToday = row.original.learnedForToday.map((item, i) => {
            if (i === index) {
              return text;
            }

            return item;
          });

          const updatedDayReport = {...row.original, learnedForToday: updatedLearnedForToday};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <TableCell
            buttonValue="add learned for today"
            onButtonClick={() => createLearnForToday()}
          >
            {row.original.learnedForToday
              .map((learnedForTodayItem, index) => (
                <CellItem key={index}>
                  <EditableText
                    text={learnedForTodayItem}
                    onChangeFinish={(text) => updateLearnForToday(text, index)}
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

        /**
         * Create MentorComment
         */
        const createMentorComment = async () => {
          const mentorComment = await MentorCommentDAL.createMentorComment(row.original);
          const mentorComments = [...row.original.mentorComments, mentorComment];
          const updatedDayReport = {...row.original, mentorComments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update MentorComment
         */
        const updateMentorComment = async (mentorComment: MentorComment, text: string) => {
          await MentorCommentDAL.updateMentorComment(mentorComment, text);
          const updatedMentorComments = row.original.mentorComments.map((item) => {
            if (item.uuid === mentorComment.uuid) {
              return new MentorComment({
                ...mentorComment,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, mentorComments: updatedMentorComments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <TableCell
            buttonValue="add comment"
            onButtonClick={() => createMentorComment()}
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
      cell: ({row}) => (
        <TableCell>
          <Checkbox
            isDefaultChecked={row.original.isDayOff}
            onChange={(value) => DayReportDAL.updateIsDayOff(row.original, value)}
          />
        </TableCell>
      ),
    }),
  ];

  return columns;
};