import {CellContext, ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/component/table/columns.module.scss";

const DEFAULT_SUMMARY_TIME = 0;

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


/**
 * Render a string within a div element.
 *
 * @param {object} params - The parameters for rendering the string item.
 * @param {string} params.text - Text to be rendered
 * @param {string} params.key - The key for the rendered div element, to ensure React elements have unique keys.
 * @param {boolean} [params.isDone] - Optional. If true, the item is styled as completed.
 *
 * @returns {JSX.Element} The rendered string item.
 */
const renderStringCell = ({text, key, isDone}: {text:string; key:string; isDone?: boolean}): JSX.Element => {
  return (
    <div key={key}>
      <div className={isDone ? styles.completed : styles.notCompleted}>
        {text}
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

export const columns: ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & string[] &
boolean & MentorComment[]>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
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
          .map((jobDoneItem) => (getObjectArrayItem(jobDoneItem, jobDoneItem.getJobDone())))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          .map((planForNextPeriodItem) =>
            (getObjectArrayItem(planForNextPeriodItem, planForNextPeriodItem.getPlanForNextPeriod())))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.problemsForCurrentPeriod
          .map((currentProblemItem) =>
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
          .map((studentCommentItem) => (renderStringCell({text: studentCommentItem, key: parentID})))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentID = row.original.uuid;

      return (
        row.original.learnedForToday
          .map((learnedForTodayItem) => (renderStringCell({text: learnedForTodayItem, key: parentID})))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", MentorComment[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {


      return (
        row.original.mentorComments
          .map((mentorComment) => (renderStringCell(
            {text: mentorComment.description, key: mentorComment.uuid, isDone: mentorComment.isDone},
          )))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
