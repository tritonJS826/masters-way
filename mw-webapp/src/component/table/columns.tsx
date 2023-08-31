import {createColumnHelper, ColumnDef, CellContext} from "@tanstack/react-table";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {WorkDone} from "src/model/report/workDone/WorkDone";
import {Report} from "src/model/report/Report";
import {Button} from "src/component/button/Button";
import {ReportService} from "src/service/Report";
import styles from "src/component/table/columns.module.scss";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const handleSubmit = (e: any) => {
//   e.preventDefault();
//   console.log(e.target.parentElement);
// };


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onclick = (index: string, e: any) => {
  // console.log(e.target.parentElement.id);
  // console.log(e.target);
  if (e.target.parentElement.id === e.target.id) {
    console.log(true);
    return ReportService.updateReportToRealTimeDb(index);
  }
};

const getStringArrayItem = (arrayItem: string, index: string) => {
  return (
    (!arrayItem) ?
      <div key={index} />
      :
      <div id={index}
        key={index}
      >
        <div className={arrayItem[0] === "✓" ? styles.completed : styles.notCompleted}>
          {`${+index + 1}. ${arrayItem}`}
        </div>
        <Button id={index}
          value="Edit report"
          key={index}
          onClick={(e) => onclick(index, e)}
          // onClick={handleSubmit}
        />

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
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor<"workDone", WorkDone[]>("workDone", {
    header: "Sum time",
    cell: (({row}) => {
      return (
        row.original.workDone
          ?.reduce((accum, elem) => elem.time.amount + accum, 0)
      );
    }),
  }),
  columnHelper.accessor<"workDone", WorkDone[]>("workDone", {
    header: "Work done",
    cell: ({row}) => {
      return (
        row.original.workDone
          ?.map((workDoneItem) => (getObjectArrayItem(workDoneItem, workDoneItem.getFullWork())))
      );
    },
  }),
  columnHelper.accessor<"planForTomorrow", PlanForTomorrow[]>("planForTomorrow", {
    header: "Plan for tomorrow",
    cell: ({row}) => {
      return (
        row.original.planForTomorrow
          ?.map((planForTomorrowItem) => (getObjectArrayItem(planForTomorrowItem, planForTomorrowItem.getFullPlan())))
      );
    },
  }),
  columnHelper.accessor<"currentProblems", string[]>("currentProblems", {
    header: "Current problems",
    cell: ({row}) => {
      const parentID = row.original.id;
      return (
        row.original.currentProblems
          .map((currentProblemsItem) => (getStringArrayItem(currentProblemsItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"studentComment", string[]>("studentComment", {
    header: "Student comment",
    cell: ({row}) => {
      const parentID = row.original.id;
      return (
        row.original.studentComment
          .map((studentCommentItem) => (getStringArrayItem(studentCommentItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentID = row.original.id;
      return (
        row.original.learnedForToday
          .map((learnedForTodayItem) => (getStringArrayItem(learnedForTodayItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"mentorComment", string[]>("mentorComment", {
    header: "Mentor comment",
    cell: ({row}) => {
      const parentID = row.original.id;
      return (
        row.original.mentorComment
          .map((mentorCommentItem) => (getStringArrayItem(mentorCommentItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
