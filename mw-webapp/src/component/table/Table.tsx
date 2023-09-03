import {useState, useEffect} from "react";
// import {useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table";
// import {Report} from "src/model/report/Report";
import {ReportService} from "src/service/ReportTest";
// import {columns} from "src/component/table/columns";
import {Button} from "src/component/button/Button";
import styles from "src/component/table/Table.module.scss";
import {Editable} from "../editable/Editable";
// import {DayReport} from "src/model/businessModel/DayReport";
// import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";
import {UserService} from "src/service/UserService";
import {User} from "src/model/firebaseCollection/User";
import {WayService} from "src/service/WayService";
import {Way} from "src/model/firebaseCollection/Way";

export const Table = () => {
  // const [data, setData] = useState<DayReport[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [ways, setWays] = useState<Way[]>([]);

  useEffect(() => {
    // ReportService.onValueFromRealTimeDb(setData);
    UserService.onValueFromRealTimeDb(setUsers);
    // WayService.onValueByIdFromRealTimeDb(setWays, "vvv");
    WayService.onValueFromRealTimeDb(setWays);
    () => {
      //TODO
      // removeEventListener from db if needed (read about handling event listeners
      // in react use effect components (when and whyu you shoud remove them))
    };
  }, []);

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  console.log(users);
  console.log(ways);

  // State for the input
  const [task, setTask] = useState("");

  const renderWays = (waysArray: string[]) => {
    return waysArray.map((way, index) => (
      <li key={index}>
        {way}
      </li>
    ));
  };

  const renderAllWays = () => {
    return ways.map((way) => (
      <li key={way.uuid}>
        {`Way's uuid: ${way.uuid}`}
      </li>
    ));
  };


  const renderUsers = () => {
    return users.map((user) => (
      <li className={styles.userContainer}
        key={user.uuid}
      >
        <div>
          {`Name: ${user.name}`}
        </div>
        <div>
          {`E-mail: ${user.email}`}
        </div>
        <div>
          <div>
            Own ways:
          </div>
          <ol>
            {renderWays(user.ownWays)}
          </ol>
        </div>
        <div>
          <div>
            Favorite ways:
          </div>
          <ol>
            {renderWays(user.favoriteWays)}
          </ol>
        </div>
        <div>
          <div>
            Mentoring ways:
          </div>
          <ol>
            {renderWays(user.mentoringWays)}
          </ol>
        </div>
      </li>
    ),
    );
  };

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
      <div>
        <h2>
          Users:
        </h2>
        <ul>
          {renderUsers()}
        </ul>
        <h2>
          Ways:
        </h2>
        <ul>
          {renderAllWays()}
        </ul>
      </div>
      {/* <table className={styles.table}>
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
      </table> */}
    </div>
  );
};
