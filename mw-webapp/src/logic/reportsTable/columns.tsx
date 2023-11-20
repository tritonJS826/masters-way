import {useState} from "react";
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
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/component/editableText/EditableText.module.scss";

const DEFAULT_SUMMARY_TIME = 0;

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
      const initialJobsDone = row.original.jobsDone;
      const [jobsDone, setJobsDone] = useState(initialJobsDone);
      const [updatedJobDone, setUpdatedJobDone] = useState<JobDone>();
      const [updatedTime, setUpdatedTime] = useState<JobDone>();

      /**
       * Create jobDone
       */
      const createJobDone = async (dayReport: DayReport) => {
        const jobDone = await JobDoneDAL.createJobDone(dayReport);
        const updatedJobsDone = [...jobsDone, jobDone];
        setJobsDone(updatedJobsDone);
      };

      /**
       * Update jobDone
       */
      const updateJobDone = async (jobDone: JobDone, text: string) => {
        await JobDoneDAL.updateJobDone(jobDone, text);
        // Const x = await JobDoneDAL.getJobDone(jobDone.uuid);
        const updatedJob = new JobDone({
          ...jobDone,
          description: text,
          time: updatedTime?.time ?? jobDone.time,
        });
        setUpdatedJobDone(updatedJob);
      };

      /**
       * Update jobDoneTime
       */
      const updateJobDoneTime = async (jobDone: JobDone, text: number) => {
        await JobDoneDAL.updateJobDoneTime(jobDone, text);
        // Const x = await JobDoneDAL.getJobDone(jobDone.uuid);
        const updatedJobTime = new JobDone({
          ...jobDone,
          description: updatedJobDone?.description ?? jobDone.description,
          time: text,
        });
        setUpdatedTime(updatedJobTime);
      };

      return (
        <TableCell
          buttonValue="add job"
          onButtonClick={() => createJobDone((row.original))}
        >
          {jobsDone
            .map((jobDone) => (
              <CellItem key={jobDone.uuid}>
                <EditableText
                  text={jobDone.description}
                  onChangeFinish={(text) => updateJobDone(updatedJobDone ?? jobDone, text)}
                />
                {UnicodeSymbols.DIVIDING_POINT}
                <EditableText
                  text={jobDone.time}
                  onChangeFinish={(text) =>
                    updateJobDoneTime(updatedTime ?? jobDone, text)}
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
      return (
        <TableCell
          buttonValue="add plan"
          onButtonClick={() => PlanForNextPeriodDAL.createPlanForNextPeriod(row.original)}
        >
          {row.original.plansForNextPeriod
            .map((planForNextPeriod) => (
              <CellItem key={planForNextPeriod.uuid}>
                <EditableText
                  text={planForNextPeriod.job}
                  onChangeFinish={(text) => PlanForNextPeriodDAL.updatePlanForNextPeriod(planForNextPeriod, text)}
                />
                {UnicodeSymbols.DIVIDING_POINT}
                <EditableText
                  text={planForNextPeriod.estimationTime}
                  onChangeFinish={(value) => PlanForNextPeriodDAL.updatePlanForNextPeriodTime(planForNextPeriod, value)}
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
      return (
        <TableCell
          buttonValue="add problem"
          onButtonClick={() => CurrentProblemDAL.createCurrentProblem(row.original)}
        >
          {row.original.problemsForCurrentPeriod
            .map((currentProblem) => (
              <CellItem key={currentProblem.uuid}>
                <EditableText
                  text={currentProblem.description}
                  onChangeFinish={(text) => CurrentProblemDAL.updateCurrentProblem(currentProblem, text)}
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
      const dayReport = row.original;

      return (
        <TableCell
          buttonValue="add comment"
          onButtonClick={() => DayReportDAL.createStudentComment(dayReport)}
        >
          {row.original.studentComments
            .map((studentComment, index) => (
              <CellItem key={index}>
                <EditableText
                  text={studentComment}
                  onChangeFinish={(text) => DayReportDAL.updateStudentComment(dayReport, text, index)}
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
      const dayReport = row.original;

      return (
        <TableCell
          buttonValue="add learned for today"
          onButtonClick={() => DayReportDAL.createLearnedForToday(dayReport)}
        >
          {row.original.learnedForToday
            .map((learnedForToday, index) => (
              <CellItem key={index}>
                <EditableText
                  text={learnedForToday}
                  onChangeFinish={(text) => DayReportDAL.updateLearnedForToday(dayReport, text, index)}
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
      return (
        <TableCell
          buttonValue="add comment"
          onButtonClick={() => MentorCommentDAL.createMentorComment(row.original)}
        >
          {row.original.mentorComments
            .map((mentorComment) => (
              <CellItem key={mentorComment.uuid}>
                <EditableText
                  text={mentorComment.description}
                  onChangeFinish={(text) => MentorCommentDAL.updateMentorComment(mentorComment, text)}
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