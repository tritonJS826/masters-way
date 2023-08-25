import {useState, useEffect} from "react";
import {useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table";
import {Report} from "src/model/report/Report";
import {ReportService} from "src/service/Report";
import {columns} from "src/component/table/columns";
import styles from "src/component/table/Table.module.scss";
import {ref, onValue} from "firebase/database";
import {db} from "src/firebase";
import {ReportDTO} from "src/model/report/ReportDTO";
import {Button} from "../button/Button";

export const Table = () => {
  const [data, setData] = useState<Report[]>([]);

  const getReports = async (elem: ReportDTO[]) => {
    const reportsData: Report[] = await ReportService.getAllReports(elem);
    console.log(reportsData);
    const reportsArray = reportsData.reverse();
    console.log(reportsArray);
    setData(reportsArray);
  };


  const getData = () => {
    onValue(ref(db), async snapshot => {
      const datas = snapshot.val();
      if (datas !== null) {
        // setData(datas);
        // console.log(datas);
        getReports(datas);

        // const reportsData: Report[] = await ReportService.getAllReports(datas);
        // console.log(reportsData);
        // const reportsArray = reportsData.reverse();
        // console.log(reportsArray);
        // setData(reportsArray);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
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
      <Button />
    </div>
  );
};