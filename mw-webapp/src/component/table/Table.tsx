import {useState, useEffect} from "react";
import {Deal} from "src/model/deal/Deal";
import {WorkComponent} from "src/component/table/WorkComponent";
import {PlanComponent} from "src/component/table/PlanComponent";
import styles from "src/component/table/Table.module.scss";

export const Table = () => {
  const [todo, setTodo] = useState<Deal[]>([]);

  const fetchTodoList = async (path: string) => {
    const todoList = await fetch(path);
    const result = await todoList.json();
    console.log(result);
    setTodo(result);
    console.log(result);
    return todoList;
  };

  useEffect(() => {
    fetchTodoList("./todoList.json");
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
            todo.map((item: Deal) => {
              return (
                <tr className={styles.tr}
                  key={item.id}
                >
                  <td className={styles.td}>
                    {item.date}
                  </td>
                  <td className={styles.td}>
                    <WorkComponent work={item.work} />
                  </td>
                  <td className={styles.td}>
                    <PlanComponent plan={item.plan} />
                  </td>
                  <td className={styles.td}>
                    {item.problem[0]}
                  </td>
                  <td className={styles.td}>
                    {item.comment[0]}
                  </td>
                  <td className={styles.td}>
                    {item.new[0]}
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