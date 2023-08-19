import {useState, useEffect} from "react";
import {useReactTable, getCoreRowModel, createColumnHelper, flexRender} from "@tanstack/react-table";
import {Report} from "src/model/report/Report";
import {ReportService} from "src/service/Report";
import styles from "src/component/table/Table.module.scss";

const columnHelper = createColumnHelper<Report>();

const columns = [
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

export const Table = () => {
  const [data, setData] = useState<Report[]>([]);

  const getReports = async () => {
    const reports = await ReportService.getAllReports();
    setData(reports);
    return reports;
  };

  useEffect(() => {
    getReports();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.tr}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th className={styles.th}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr className={styles.tr}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className={styles.td}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};