import {useState, useEffect} from "react";
import {Report} from "src/model/report/Report";
import {WorkComponent} from "src/component/table/WorkComponent";
import {PlanComponent} from "src/component/table/PlanComponent";
import styles from "src/component/table/Table.module.scss";
import {ReportService} from "src/service/Report";

export const Table = () => {
  const [todo, setTodo] = useState<Report[]>([]);

  const getReports = async () => {
    const reports = await ReportService.getAllReports();
    setTodo(reports);
    return reports;
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>
              Date
            </th>
            <th className={styles.th}>
              Done
            </th>
            <th className={styles.th}>
              Plan
            </th>
            <th className={styles.th}>
              Problems
            </th>
            <th className={styles.th}>
              Comments
            </th>
            <th className={styles.th}>
              New
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            todo.map((item: Report) => {
              return (
                <tr className={styles.tr}
                  key={item.id}
                >
                  <td className={styles.td}>
                    {item.date.toISOString().slice(0, 10)}
                  </td>
                  <td className={styles.td}>
                    <WorkComponent work={item.workDone} />
                  </td>
                  <td className={styles.td}>
                    <PlanComponent plan={item.planForTomorrow} />
                  </td>
                  <td className={styles.td}>
                    {item.currentProblems[0]}
                  </td>
                  <td className={styles.td}>
                    {item.studentComment[0]}
                  </td>
                  <td className={styles.td}>
                    {item.learnedForToday[0]}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};