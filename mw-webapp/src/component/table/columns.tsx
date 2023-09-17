import {CellContext, ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/component/table/columns.module.scss";

const FIRST_INDEX = 0;
const DEFAULT_VALUE = 0;

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
    //TODO: task #65 use flag instead of first index
      <div key={index}>
        <div className={arrayItem[FIRST_INDEX] === "✓" ? styles.completed : styles.notCompleted}>
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
    DateUtils.getShortISODateValue(cellValue.getValue())
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & string[] & boolean>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    cell: (({row}) => {
      return (
        row.original.jobsDone
          ?.reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_VALUE)
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
  columnHelper.accessor<"mentorComments", string[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.mentorComments
          ?.map((mentorCommentItem) => (getStringArrayItem(mentorCommentItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
