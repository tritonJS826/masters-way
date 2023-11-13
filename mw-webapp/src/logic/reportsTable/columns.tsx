import {createColumnHelper} from "@tanstack/react-table";
import {CellItem} from "src/component/table/tableCell/cellItem/CellItem";
import {TableCell} from "src/component/table/tableCell/TableCell";
import {addCellItem} from "src/logic/reportsTable/renderCellItem/helpers/addCellItem";
import {renderCellDate} from "src/logic/reportsTable/renderCellItem/renderCellDate";
import {renderCellIsDayOff} from "src/logic/reportsTable/renderCellItem/renderCellIsDayOff";
import {renderEditableString} from "src/logic/reportsTable/renderCellItem/renderEditableString";
import {renderEditableText} from "src/logic/reportsTable/renderCellItem/renderEditableText";
import {renderEditableTime} from "src/logic/reportsTable/renderCellItem/renderEditableTime";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {unicodeSymbols} from "src/utils/unicodeSymbols";

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
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",

    /**
     * Cell with date value
     */
    cell: (dateValue) => (
      <TableCell callback={() => {}}>
        {renderCellDate(dateValue)}
      </TableCell>
    ),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",

    /**
     * Cell with summary of work time
     */
    cell: (({row}) => {
      return (
        <TableCell callback={() => {}}>
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
          callback={() => addCellItem({rowUuid: row.original.uuid, dataType: "JobDone"})}
        >
          {row.original.jobsDone
            .map((jobDoneItem) => (
              <CellItem key={jobDoneItem.uuid}>
                {renderEditableText({content: jobDoneItem.description, arrayItem: jobDoneItem})}
                {unicodeSymbols.dot}
                {renderEditableTime({time: jobDoneItem.time, arrayItem: jobDoneItem})}
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
          callback={() => addCellItem({rowUuid: row.original.uuid, dataType: "PlanForNextPeriod"})}
        >
          {row.original.plansForNextPeriod
            .map((planForNextPeriod) => (
              <CellItem key={planForNextPeriod.uuid}>
                {renderEditableText({content: planForNextPeriod.job, arrayItem: planForNextPeriod})}
                {unicodeSymbols.dot}
                {renderEditableTime({time: planForNextPeriod.estimationTime, arrayItem: planForNextPeriod})}
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
          callback={() => addCellItem({rowUuid: row.original.uuid, dataType: "CurrentProblem"})}
        >
          {row.original.problemsForCurrentPeriod
            .map((currentProblem) => (
              <CellItem key={currentProblem.uuid}>
                {renderEditableText({content: currentProblem.description, arrayItem: currentProblem})}
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
      const rowUuid = row.original.uuid;

      return (
        <TableCell
          buttonValue="add comment"
          callback={() => addCellItem({rowUuid: row.original.uuid, dataType: "studentComments"})}
        >
          {row.original.studentComments
            .map((studentComment, index) => (
              <CellItem key={index.toString()}>
                {renderEditableString({content: studentComment, rowUuid, propertyName: "studentComments", index})}
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
      const rowUuid = row.original.uuid;

      return (
        <TableCell
          buttonValue="add learned for today"
          callback={() => addCellItem({rowUuid: row.original.uuid, dataType: "learnedForToday"})}
        >
          {row.original.learnedForToday
            .map((learnedForToday, index) => (
              <CellItem key={index.toString()}>
                {renderEditableString({content: learnedForToday, rowUuid, propertyName: "learnedForToday", index})}
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
          callback={() => addCellItem({rowUuid: row.original.uuid, dataType: "MentorComment"})}
        >
          {row.original.mentorComments
            .map((mentorComment) => (
              <CellItem key={mentorComment.uuid}>
                {renderEditableText({content: mentorComment.description, arrayItem: mentorComment})}
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
      <TableCell callback={() => {}}>
        {renderCellIsDayOff(isDayOffValue)}
      </TableCell>
    )
    ,
  }),
];