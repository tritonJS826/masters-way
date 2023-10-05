import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {renderCellDate} from "src/component/table/renderCellValue/renderCellDate";
import {renderCellIsDayOff} from "src/component/table/renderCellValue/renderCellIsDayOff";
import {renderCellItem} from "src/component/table/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

const DEFAULT_SUMMARY_TIME = 0;

const columnHelper = createColumnHelper<DayReport>();

type DayReportCells = Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & MentorComment[] & string[] & boolean;

/**
 * Render cells in table with data types {@link DayReportCells}
 */
export const columns: ColumnDef<DayReport, DayReportCells>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    /**
     * Render date
     */
    cell: (dateValue) => renderCellDate(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    /**
     * Render Summary time
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
     * Render Jobs done
     */
    cell: ({row}) => {
      return (
        row.original.jobsDone
          .map((jobDoneItem) => (renderCellItem({item: jobDoneItem.getJobDone(), arrayItem: jobDoneItem})))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    /**
     * Render Plans for next period
     */
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          .map((planForNextPeriod) =>
            (renderCellItem({item: planForNextPeriod.getPlanForNextPeriod(), arrayItem: planForNextPeriod})))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    /**
     * Render Problems for current period
     */
    cell: ({row}) => {
      return (
        row.original.problemsForCurrentPeriod
          .map((currentProblem) =>
            (renderCellItem({item: currentProblem.description, arrayItem: currentProblem, isDone: currentProblem.isDone})))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",
    /**
     * Render Student comments
     */
    cell: ({row}) => {
      const parentUuid = row.original.uuid;

      return (
        row.original.studentComments
          .map((studentComment, index) =>
            renderCellItem({item: studentComment, parentUuid, columnName: "studentComments", index}))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    /**
     * Render Learned for today
     */
    cell: ({row}) => {
      const parentUuid = row.original.uuid;

      return (
        row.original.learnedForToday
          .map((learnedForToday, index) =>
            renderCellItem({item: learnedForToday, parentUuid, columnName: "learnedForToday", index}))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", MentorComment[]>("mentorComments", {
    header: "Mentor comments",
    /**
     * Render Mentor comments
     */
    cell: ({row}) => {
      return (
        row.original.mentorComments
          .map((mentorComment) =>
            renderCellItem({item: mentorComment.description, arrayItem: mentorComment, isDone: mentorComment.isDone}))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    /**
     * Render Is day off value
     */
    cell: (isDAyOffValue) => renderCellIsDayOff(isDAyOffValue),
  }),
];