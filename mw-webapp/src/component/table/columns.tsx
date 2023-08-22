import {createColumnHelper} from "@tanstack/react-table";
import {Report} from "src/model/report/Report";

const columnHelper = createColumnHelper<Report>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue().toISOString().slice(0, 10),
  }),
  columnHelper.accessor("workDone", {
    header: "Work done",
    cell: ({row}) => {
      return (
        row.original.workDone
          .map((work, index) => (
            (JSON.stringify(work) === "{}") ?
              <div key={index} />
              :
              <div key={work.id}>
                {`${+work.id + 1}. ${work.getFullWork()}`}
              </div>
          ))
      );
    },
  }),
  columnHelper.accessor("planForTomorrow", {
    header: "Plan for tomorrow",
    cell: ({row}) => {
      return (
        row.original.planForTomorrow
          .map((plan, index) => (
            (JSON.stringify(plan) === "{}") ?
              <div key={index} />
              :
              <div key={plan.id}>
                {`${+plan.id + 1}. ${plan.getFullPlan()}`}
              </div>
          ))
      );
    },
  }),
  columnHelper.accessor("currentProblems", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.currentProblems
          .map((problem, index) => (
            (!problem) ?
              <div key={index} />
              :
              <div key={index}>
                {`${+index + 1}. ${problem}`}
              </div>
          ))
      );
    },
  }),
  columnHelper.accessor("studentComment", {
    header: "Student comment",
    cell: ({row}) => {
      return (
        row.original.studentComment
          .map((comment, index) => (
            (!comment) ?
              <div key={index} />
              :
              <div key={index}>
                {comment}
              </div>
          ))
      );
    },
  }),
  columnHelper.accessor("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      return (
        row.original.learnedForToday
          .map((learned, index) => (
            (!learned) ?
              <div key={index} />
              :
              <div key={index}>
                {learned}
              </div>
          ))
      );
    },
  }),
  columnHelper.accessor("mentorComment", {
    header: "Mentor comment",
    cell: ({row}) => {
      return (
        row.original.mentorComment
          .map((comment, index) => (
            (!comment) ?
              <div key={index} />
              :
              <div key={index}>
                {comment}
              </div>
          ))
      );
    },
  }),
  columnHelper.accessor("isDayOff", {
    header: "Is day off",
    cell: (info) => info.getValue() === true ?
      <div>
        Yes
      </div>
      :
      <div>
        No
      </div>,
  }),
];