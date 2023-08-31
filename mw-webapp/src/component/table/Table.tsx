import {useState, useEffect} from "react";
import {useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table";
// import {Report} from "src/model/report/Report";
import {ReportService} from "src/service/ReportTest";
import {columns} from "src/component/table/columns";
import {Button} from "src/component/button/Button";
import styles from "src/component/table/Table.module.scss";
import {Editable} from "../editable/Editable";
// import {DayReport} from "src/model/businessModel/DayReport";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

export const Table = () => {
  const [data, setData] = useState<DayReportDTO[]>([]);

  useEffect(() => {
    ReportService.onValueFromRealTimeDb(setData);
    () => {
      //TODO
      // removeEventListener from db if needed (read about handling event listeners
      // in react use effect components (when and whyu you shoud remove them))
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);

  // State for the input
  const [task, setTask] = useState("");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
      <Editable
        text={task}
        placeholder="Write a task name"
        type="input"
      >
        <input
          type="text"
          name="task"
          placeholder="Write a task name"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </Editable>
      <Button value="Create new report"
        onClick={ReportService.writeNewReportToRealTimeDb}
      />
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
