import {useState, useEffect} from "react";
import {useReactTable, getCoreRowModel, createColumnHelper, flexRender} from "@tanstack/react-table";
import {Report} from "src/model/report/Report";
import {ReportService} from "src/service/Report";

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
              <h4>
                {work.todoItem}
              </h4>
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
              <h4>
                {plan.todoItem}
              </h4>
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

export const T = () => {
  // const reports = async () => await ReportService.getAllReports();

  // const [data] = useState<Report[]>(reports());

  // const data = async () => await ReportService.getAllReports();

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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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