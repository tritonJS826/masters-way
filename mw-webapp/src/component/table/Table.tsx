import {useState, useEffect} from "react";
import "src/component/table/Table.css";

export const Table = () => {
  const [todo, setTodo] = useState([
    {
      "id": 1,
      "date": "2023-08-13",
      "done": ["lorem"],
      "plan": ["plan"],
      "problems": ["problems"],
      "comments": ["comments"],
      "new": ["new"],
    },
  ]);

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
            todo.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.date}
                  </td>
                  <td>
                    {item.done}
                  </td>
                  <td>
                    {item.plan}
                  </td>
                  <td>
                    {item.problems}
                  </td>
                  <td>
                    {item.comments}
                  </td>
                  <td>
                    {item.new}
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