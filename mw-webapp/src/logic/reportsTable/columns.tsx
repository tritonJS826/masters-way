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
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

const DEFAULT_SUMMARY_TIME = 0;

const columnHelper = createColumnHelper<DayReport>();

/**
 * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
 * The tanstack table has a bug about typing columns:
 * https://github.com/TanStack/table/issues/4382
 * According to creators should only be using the column helper and not pre-typing columns
 * We can add type as:
 * ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & MentorComment[] & string[] & boolean>
 * but it's not recommend by creators
 */
export const columns = [
  columnHelper.accessor("date", {
    header: "Date",

    /**
     * Cell with date value
     */
    cell: (dateValue) => (
      <TableCell onButtonClick={() => {}}>
        {renderCellDate(dateValue)}
      </TableCell>
    ),
  }),
  columnHelper.accessor("jobsDone", {
    header: "Sum time",

    /**
     * Cell with summary of work time
     */
    cell: (({row}) => {
      return (
        <TableCell onButtonClick={() => {}}>
          {row.original.jobsDone
            .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
          }
        </TableCell>
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done (minutes)",

    /**
     * Cell with JobsDone items
     */
    cell: ({row}) => {
      return (
        <TableCell
          buttonValue="add job"
          onButtonClick={() => JobDoneDAL.createJobDone((row.original))}
        >
          {row.original.jobsDone
            .map((jobDone) => (
              <CellItem key={jobDone.uuid}>
                <EditableText
                  text={jobDone.description}
                  onChangeFinish={(text) => JobDoneDAL.updateJobDone(jobDone, text)}
                />
                {UnicodeSymbols.DIVIDING_POINT}
                <EditableText
                  text={jobDone.time}
                  onChangeFinish={(text) => JobDoneDAL.updateJobDoneTime(jobDone, Number(text))}
                />
              </CellItem>
            ),
            )
          }
        </TableCell>
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
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
                  onChangeFinish={(value) => PlanForNextPeriodDAL.updatePlanForNextPeriodTime(planForNextPeriod, Number(value))}
                />
              </CellItem>
            ),
            )
          }
        </TableCell>
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
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
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
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
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
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
  columnHelper.accessor<"mentorComments", MentorComment[]>("mentorComments", {
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
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",

    /**
     * Cell with IsDayOff value
     */
    cell: (isDayOffValue) => (
      <TableCell onButtonClick={() => {}}>
        {renderCellIsDayOff(isDayOffValue)}
      </TableCell>
    )
    ,
  }),
];