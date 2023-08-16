import {useState, useEffect} from "react";
import {Deal} from "src/model/deal/Deal";
import {WorkComponent} from "src/component/table/WorkComponent";
import {PlanComponent} from "src/component/table/PlanComponent";
import "src/component/table/Table.css";

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
      <h1>
        Hiii, Student!
      </h1>
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Done
            </th>
            <th>
              Plan
            </th>
            <th>
              Problems
            </th>
            <th>
              Comments
            </th>
            <th>
              New
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            todo.map((item: Deal) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.date}
                  </td>
                  <td>
                    <WorkComponent work={item.work} />
                  </td>
                  <td>
                    <PlanComponent plan={item.plan} />
                  </td>
                  <td>
                    {item.problem[0]}
                  </td>
                  <td>
                    {item.comment[0]}
                  </td>
                  <td>
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