import {createColumnHelper, ColumnDef, CellContext} from "@tanstack/react-table";
// import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
// import {WorkDone} from "src/model/report/workDone/WorkDone";
// import {Report} from "src/model/report/Report";
import {Button} from "src/component/button/Button";
import {ReportService} from "src/service/ReportTest";
import styles from "src/component/table/columns.module.scss";
import {DayReport} from "src/model/businessModel/DayReport";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {onValue, ref} from "firebase/database";
import {db} from "src/firebase";
// import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

const columnHelper = createColumnHelper<DayReport>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onclick = (index: string, e: any) => {
  console.log(e.target.parentElement.id);
  console.log(e.target);
  if (e.target.parentElement.id === e.target.id) {
    console.log(true);
    return ReportService.updateReportToRealTimeDb(index);
  }
};

const getObjectArrayItem = (arrayItem: JobDone | PlanForNextPeriod | CurrentProblem, index: number, getFullItem?: string) => {
  console.log(arrayItem);
  let qqq;
  onValue(ref(db, "/currentProblems"), async (snapshot) => {
    snapshot.val();
    qqq = snapshot.val();
    console.log(snapshot.val());
  });
  console.log(arrayItem.uuid);
  return (
    (JSON.stringify(qqq) === "{}") ?
      <div key={arrayItem.uuid}>
        {`${+index + 2}. ${getFullItem}`}
      </div>
      : (arrayItem.uuid !== "prprpr") ?
        <div key={arrayItem.uuid}>
          {`${+index + 13}. ${qqq}`}
        </div>
        :
        <div key={arrayItem.uuid}>
          {`${+index + 1}`}
        </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const handleSubmit = (e: any) => {
//   e.preventDefault();
//   console.log(e.target.parentElement);
// };

const getStringArrayItem = (arrayItem: string, number: number, index: string) => {
  return (
    (!arrayItem) ?
      <div id={index}
        key={index}
      >
        <Button id={index}
          value="Edit report"
          key={index}
          onClick={(e) => onclick(index, e)}
        />
      </div>
      :
      <div id={index}
        key={index}
      >
        <div className={arrayItem[0] === "✓" ? styles.completed : styles.notCompleted}>
          {`${+number + 1}. ${arrayItem}`}
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

const getBoolean = (cellValue: CellContext<DayReport, boolean>) => {
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

const getDateValue = (cellValue: CellContext<DayReport, Date>) => {
  return (
    cellValue.getValue().toISOString().slice(0, 10)
  );
};

// const x = () => {
//   onValue(ref(db, "/currentProblems"), async (snapshot) => {
//     result = snapshot.val();
//     console.log(result);
//   });
// };

// Date & WorkDone[] & PlanForTomorrow[] & string[] & boolean & string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<DayReport, any>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    cell: (({row}) => {
      console.log(row.original);
      return (
        row.original.jobsDone
          ?.reduce((accum, elem) => elem.time + accum, 0)
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done",
    cell: ({row}) => {
      return (
        row.original.jobsDone
          ?.map((jobsDoneItem, index) => (getObjectArrayItem(jobsDoneItem, index)))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          ?.map((plansForNextPeriodItem, index) => (getObjectArrayItem(plansForNextPeriodItem, index)))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.problemsForCurrentPeriod
          ?.map((problemsForCurrentPeriodItem, index) => (getObjectArrayItem(problemsForCurrentPeriodItem, index, parentID)))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.studentComments
          ?.map((studentCommentsItem, index) => (getStringArrayItem(studentCommentsItem, index, parentID)))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.learnedForToday
          ?.map((learnedForTodayItem, index) => (getStringArrayItem(learnedForTodayItem, index, parentID)))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", string[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.mentorComments
          ?.map((mentorCommentsItem, index) => (getStringArrayItem(mentorCommentsItem, index, parentID)))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
