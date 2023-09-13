import {createColumnHelper, ColumnDef, CellContext} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import styles from "src/component/table/columns.module.scss";
import {MentorComment} from "src/model/businessModel/MentorComment";

const columnHelper = createColumnHelper<DayReport>();

const getObjectArrayItem = (arrayItem: JobDone | PlanForNextPeriod | CurrentProblem, getFullItem?: string) => {
  return (
    (JSON.stringify(arrayItem) === "{}") ?
      <div />
      :
      <div key={arrayItem.uuid}>
        {getFullItem}
      </div>
  );
};

const getStringArrayItem = (arrayItem: string, index: string) => {
  return (
    (!arrayItem) ?
      <div />
      :
      <div key={index}>
        <div className={arrayItem[0] === "✓" ? styles.completed : styles.notCompleted}>
          {arrayItem}
        </div>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
export const columns: ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & MentorComment[] & string[] & boolean>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    cell: (({row}) => {
      return (
        row.original.jobsDone
          ?.reduce((accum, item) => item.time + accum, 0)
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done",
    cell: ({row}) => {
      return (
        row.original.jobsDone
          ?.map((jobDoneItem) => (getObjectArrayItem(jobDoneItem, jobDoneItem.getJobDone())))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          ?.map((planForNextPeriodItem) =>
            (getObjectArrayItem(planForNextPeriodItem, planForNextPeriodItem.getPlanForNextPeriod())))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.problemsForCurrentPeriod
          ?.map((currentProblemItem) =>
            (getObjectArrayItem(currentProblemItem, currentProblemItem.description)))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.studentComments
          ?.map((studentCommentItem) => (getStringArrayItem(studentCommentItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.learnedForToday
          ?.map((learnedForTodayItem) => (getStringArrayItem(learnedForTodayItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", MentorComment[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {
      return (
        row.original.mentorComments
          ?.map((mentorCommentItem) => (getObjectArrayItem(mentorCommentItem, mentorCommentItem.description)))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
