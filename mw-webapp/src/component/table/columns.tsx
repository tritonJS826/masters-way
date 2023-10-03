import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {renderCellDate} from "src/component/table/renderCellValue/renderCellDate";
import {renderCellItem} from "src/component/table/renderCellValue/renderCellItem";
import {renderCellIsDayOff} from "src/component/table/renderCellValue/renderICellsDayOff";
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
    cell: (dateValue) => renderCellDate(dateValue),
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
          .map((jobDoneItem) => (renderCellItem({item: jobDoneItem.getJobDone(), arrayItem: jobDoneItem})))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          .map((planForNextPeriodItem) =>
            (renderCellItem({item: planForNextPeriodItem.getPlanForNextPeriod(), arrayItem: planForNextPeriodItem})))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.problemsForCurrentPeriod
          .map((currentProblemItem) =>
            (renderCellItem({item: currentProblemItem.description, arrayItem: currentProblemItem})))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",
    cell: ({row}) => {
      const parentUuid = row.original.uuid;
      return (
        row.original.studentComments
          .map((item, index) => renderCellItem({item, parentUuid, columnName: "studentComments", index}))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentUuid = row.original.uuid;
      return (
        row.original.learnedForToday
          .map((item, index) => renderCellItem({item, parentUuid, columnName: "learnedForToday", index}))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", string[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {
      const parentUuid = row.original.uuid;
      return (
        row.original["mentorComments"]
          .map((item, index) => renderCellItem({item, parentUuid, columnName: "mentorComments", index}))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => renderCellIsDayOff(isDAyOffValue),
  }),
];