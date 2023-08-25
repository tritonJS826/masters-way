import {createColumnHelper, ColumnDef, CellContext} from "@tanstack/react-table";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Report} from "src/model/report/Report";
import {WorkDone} from "src/model/report/workDone/WorkDone";

const columnHelper = createColumnHelper<Report>();

const getObjectArrayItem = (arrayItem: WorkDone | PlanForTomorrow, getFullItem?: string) => {
  return (
    (JSON.stringify(arrayItem) === "{}") ?
      <div key={arrayItem.id} />
      :
      <div key={arrayItem.id}>
        {`${+arrayItem.id + 1}. ${getFullItem}`}
      </div>
  );
};

const getStringArrayItem = (arrayItem: string, index: number) => {
  return (
    (!arrayItem) ?
      <div key={index} />
      :
      <div key={index}>
        {`${+index + 1}. ${arrayItem}`}
      </div>
  );
};

const getBoolean = (cellValue: CellContext<Report, boolean>) => {
  return (
    cellValue.getValue() === true ?
      <div>
        Yes
      </div>
      :
      <div>
        No
      </div>
  );
};

const getDateValue = (cellValue: CellContext<Report, Date>) => {
  return (
    cellValue.getValue().toISOString().slice(0, 10)
  );
};

export const columns: ColumnDef<Report, Date & WorkDone[] & PlanForTomorrow[] & string[] & boolean>[] = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor("workDone", {
    header: "Work done",
    // cell: (info) => info.getValue(),
    cell: ({row}) => {
      return (
        row.original.workDone
          ?.map((workDoneItem) => (getObjectArrayItem(workDoneItem, workDoneItem.getFullWork())))
      );
    },
  }),
  columnHelper.accessor("planForTomorrow", {
    header: "Plan for tomorrow",
    cell: ({row}) => {
      return (
        row.original.planForTomorrow
          ?.map((planForTomorrowItem) => (getObjectArrayItem(planForTomorrowItem, planForTomorrowItem.getFullPlan())))
      );
    },
  }),
  columnHelper.accessor("currentProblems", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.currentProblems
          .map((currentProblemsItem, index) => (getStringArrayItem(currentProblemsItem, index)))
      );
    },
  }),
  columnHelper.accessor("studentComment", {
    header: "Student comment",
    cell: ({row}) => {
      return (
        row.original.studentComment
          .map((studentCommentItem, index) => (getStringArrayItem(studentCommentItem, index)))
      );
    },
  }),
  columnHelper.accessor("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      return (
        row.original.learnedForToday
          .map((learnedForTodayItem, index) => (getStringArrayItem(learnedForTodayItem, index)))
      );
    },
  }),
  columnHelper.accessor("mentorComment", {
    header: "Mentor comment",
    cell: ({row}) => {
      return (
        row.original.mentorComment
          .map((mentorCommentItem, index) => (getStringArrayItem(mentorCommentItem, index)))
      );
    },
  }),
  columnHelper.accessor("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];