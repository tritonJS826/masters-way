import {createColumnHelper} from "@tanstack/react-table";
import {renderCellDate} from "src/logic/reportsTable/renderCellValue/renderCellDate";
import {renderCellIsDayOff} from "src/logic/reportsTable/renderCellValue/renderCellIsDayOff";
import {renderCellItem} from "src/logic/reportsTable/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

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
    cell: (dateValue) => renderCellDate(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",

    /**
     * Cell with summary of work time
     */
    cell: (({row}) => {
      return (
        row.original.jobsDone
          .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done",

    /**
     * Cell with JobsDone items
     */
    cell: ({row}) => {
      return (
        row.original.jobsDone
          .map((jobDoneItem) => (renderCellItem({content: jobDoneItem.getJobDone(), arrayItem: jobDoneItem})))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",

    /**
     * Cell with PlanForNextPeriod items
     */
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          .map((planForNextPeriod) =>
            (renderCellItem({content: planForNextPeriod.getPlanForNextPeriod(), arrayItem: planForNextPeriod})))
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
        row.original.problemsForCurrentPeriod
          .map((currentProblem) =>
            (renderCellItem({
              content: currentProblem.description,
              arrayItem: currentProblem,
              isListItemDone: currentProblem.isDone,
            })))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",

    /**
     * Cell with StudentComments items
     */
    cell: ({row}) => {
      const parentUuid = row.original.uuid;

      return (
        row.original.studentComments
          .map((studentComment, index) =>
            renderCellItem({content: studentComment, parentUuid, columnName: "studentComments", index}))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",

    /**
     * Cell with LearnForToday items
     */
    cell: ({row}) => {
      const parentUuid = row.original.uuid;

      return (
        row.original.learnedForToday
          .map((learnedForToday, index) =>
            renderCellItem({content: learnedForToday, parentUuid, columnName: "learnedForToday", index}))
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
        row.original.mentorComments
          .map((mentorComment) =>
            renderCellItem({content: mentorComment.description, arrayItem: mentorComment, isListItemDone: mentorComment.isDone}))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",

    /**
     * Cell with IsDayOff value
     */
    cell: (isDAyOffValue) => renderCellIsDayOff(isDAyOffValue),
  }),
];
