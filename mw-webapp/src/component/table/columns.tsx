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
 * Render string in the cell
 * TODO: change this function in task #27
 */
const renderObjectArrayItem = (arrayItem: JobDone | PlanForNextPeriod | CurrentProblem, getFullItem?: string) => {
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
 * @param {string} params.content - Text to be rendered
 * @param {string} params.key - The key for the rendered div element, to ensure React elements have unique keys.
 * @param {boolean} [params.isDone] - Optional. If true, the item is styled as completed.
 *
 * @returns {JSX.Element} The rendered string item.
 */
const renderStringCell = ({content, key, isDone}: {

  /**
   * Cell's content
   */
  content: string;

  /**
   * Unique value for cells in in one row of table
   */
  key: string;

  /**
   * TODO: delete or rename this prop for split render cell and styles.
   * TODO: Because props isDone can be unusable for other tables cells
   */
  isDone?: boolean;
}): JSX.Element => {
  return (
    <div key={key}>
      <div className={isDone ? styles.completed : styles.notCompleted}>
        {content}
      </div>
    </div>
  );
};

/**
 * Render cell with boolean value
 */
const renderBoolean = (cellValue: CellContext<DayReport, boolean>) => {
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
 * Render cell with date value
 */
const renderDateValue = (cellValue: CellContext<DayReport, Date>) => {
  return (
    DateUtils.getShortISODateValue(cellValue.getValue())
  );
};

export const columns: ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & string[] &
boolean & MentorComment[]>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",

    /**
     * Cell with date value
     */
    cell: (dateValue) => renderDateValue(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",

    /**
     * Cell with summary of work time
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
     * Cell with JobsDone items
     */
    cell: ({row}) => {
      return (
        row.original.jobsDone
          .map((jobDoneItem) => (renderObjectArrayItem(jobDoneItem, jobDoneItem.getJobDone())))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",

    /**
     * Cell with PlanForNextPeriod items
     */
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

    /**
     * Cell with ProblemsForCurrentPeriod items
     */
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

    /**
     * Cell with StudentComments items
     */
    cell: ({row}) => {
      const parentID = row.original.uuid;

      return (
        row.original.studentComments
          .map((studentCommentItem) => (renderStringCell({content: studentCommentItem, key: parentID})))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",

    /**
     * Cell with LearnForToday items
     */
    cell: ({row}) => {
      const parentID = row.original.uuid;

      return (
        row.original.learnedForToday
          .map((learnedForTodayItem) => (renderStringCell({content: learnedForTodayItem, key: parentID})))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", MentorComment[]>("mentorComments", {
    header: "Mentor comments",

    /**
     * Cell with MentorComments items
     */
    cell: ({row}) => {

      return (
        row.original.mentorComments
          .map((mentorComment) => (renderStringCell(
            {content: mentorComment.description, key: mentorComment.uuid, isDone: mentorComment.isDone},
          )))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",

    /**
     * Cell with IsDayOff value
     */
    cell: (isDAyOffValue) => renderBoolean(isDAyOffValue),
  }),
];
