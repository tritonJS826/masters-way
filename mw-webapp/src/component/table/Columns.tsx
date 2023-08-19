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
          .map((work) => (
            <div key={work.id}>
              <li>
                {work.todoItem}
              </li>
              <p>
                {`${work.getFullWork}`}
              </p>
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
          .map((plan) => (
            <div key={plan.id}>
              <li>
                {plan.todoItem}
              </li>
            </div>
          ))
      );
    },
  }),
  columnHelper.accessor("currentProblems", {
    header: "Current problems",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("studentComment", {
    header: "Student comment",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("learnedForToday", {
    header: "Learned for today",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("mentorComment", {
    header: "Mentor comment",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("isDayOff", {
    header: "Is day off",
    cell: (info) => info.getValue(),
  }),
];