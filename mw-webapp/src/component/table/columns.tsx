import {createColumnHelper, ColumnDef, CellContext} from "@tanstack/react-table";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {WorkDone} from "src/model/report/workDone/WorkDone";
import styles from "src/component/table/columns.module.scss";
import {TableColumns} from "src/model/report/TableColumns";

const columnHelper = createColumnHelper<TableColumns>();

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
      <div className={arrayItem[0] === "✓" ? styles.completed : styles.notCompleted}
        key={index}
      >
        {`${+index + 1}. ${arrayItem}`}
      </div>
  );
};

const getBoolean = (cellValue: CellContext<TableColumns, boolean>) => {
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

const getDateValue = (cellValue: CellContext<TableColumns, Date>) => {
  return (
    cellValue.getValue().toISOString().slice(0, 10)
  );
};

export const columns: ColumnDef<TableColumns, Date & WorkDone[] & PlanForTomorrow[] & string[] & boolean & number>[] = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor("workHours", {
    header: "Sum time",
    cell: (({row}) => {
      return (
        row.original.workDone
          ?.reduce((accum, elem) => elem.time.amount + accum, 0)
      );
    }),
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
