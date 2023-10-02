import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {renderDate} from "src/component/table/renderDate";
import {renderIsDayOff} from "src/component/table/renderIsDayOff";
import {renderObjectArrayItem} from "src/component/table/renderObjectArrayItem";
import {renderStringArray} from "src/component/table/renderStringArrayitem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

const DEFAULT_SUMMARY_TIME = 0;

const columnHelper = createColumnHelper<DayReport>();

type DayReportCells = Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & string[] & boolean;

export const columns: ColumnDef<DayReport, DayReportCells>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => renderDate(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    cell: (({row}) => {
      return (
        row.original.jobsDone
          .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done",
    cell: ({row}) => {
      return (
        row.original.jobsDone
          .map((jobDoneItem) => (renderObjectArrayItem(jobDoneItem, jobDoneItem.getJobDone())))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          .map((planForNextPeriodItem) =>
            (renderObjectArrayItem(planForNextPeriodItem, planForNextPeriodItem.getPlanForNextPeriod())))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.problemsForCurrentPeriod
          .map((currentProblemItem) =>
            (renderObjectArrayItem(currentProblemItem, currentProblemItem.description)))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.studentComments
          .map((studentCommentItem, index) => (renderStringArray(studentCommentItem, parentID, "studentComments", index)))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.learnedForToday
          .map((learnedForTodayItem, index) => (renderStringArray(learnedForTodayItem, parentID, "learnedForToday", index)))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", string[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.mentorComments
          .map((mentorCommentItem, index) => (renderStringArray(mentorCommentItem, parentID, "mentorComments", index)))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => renderIsDayOff(isDAyOffValue),
  }),
];