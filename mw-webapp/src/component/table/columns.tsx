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

/**
 * Render cell item based on array item
 */
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
const renderStringCell = ({text, key, isDone}: {
  /**
   * Text
   */
  text:string;
  /**
   * Key
   */
  key:string;
  /**
   * Is done
   */
  isDone?: boolean;
}): JSX.Element => {
  return (
    <div key={key}>
      <div className={isDone ? styles.completed : styles.notCompleted}>
        {text}
      </div>
    </div>
  );
};

/**
 * Render cell with boolean value
 */
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

/**
 * Render cell with date
 */
const getDateValue = (cellValue: CellContext<DayReport, Date>) => {
  return (
    DateUtils.getShortISODateValue(cellValue.getValue())
  );
};

export const columns: ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & string[] &
boolean & MentorComment[]>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    /**
     * Render date
     */
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    /**
     * Render summary of work time
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
     * Render jobs done
     */
    cell: ({row}) => {
      return (
        row.original.jobsDone
          .map((jobDoneItem) => (getObjectArrayItem(jobDoneItem, jobDoneItem.getJobDone())))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    /**
     * Render plans for next period
     */
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
    /**
     * Render problems for current period
     */
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
    /**
     * Render student comments
     */
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
    /**
     * Render learnder for today
     */
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
    /**
     * Render mentor comments
     */
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
    /**
     * Render is day off value
     */
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
