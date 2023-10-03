import {useEffect, useState} from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {User} from "firebase/auth";
import {columns} from "src/component/table/columns";
import {getDayReports} from "src/dataAccessLogic/getDayReports";
import {DayReport} from "src/model/businessModel/DayReport";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import styles from "src/component/table/Table.module.scss";

/**
 * Table (need update for split component and logic code)
 */
export const Table = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  const [data, setData] = useState<DayReport[]>([]);

  // TODO: change after table will be component, get Ways instead of dayReports
  const loadDayReports = async (currentUser: User | null) => {
    const dayReports = await getDayReports(currentUser);
    setData(dayReports);
  };

  useEffect(() => {
    loadDayReports(user);
  }, [user]);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className={styles.tr}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th
                  className={styles.th}
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
            <tr
              className={styles.tr}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className={styles.td}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
