import {useState, useEffect} from "react";
import {Deal} from "src/model/deal/Deal";
import {WorkComponent} from "src/component/table/WorkComponent";
import {PlanComponent} from "src/component/table/PlanComponent";
import "src/component/table/Table.css";

export const Table = () => {
  const [todo, setTodo] = useState<Deal[]>([
    {
      "id": "0",
      "date": "2023-08-15",
      "work": [
        {
          "id": "0",
          "case": "Initialized the project",
          "time": {
            "unit": "MINUTE",
            "amount": 15,
          },
        },
        {
          "id": "1",
          "case": "Set up tsconfig, eslint environment",
          "time": {
            "unit": "MINUTE",
            "amount": 55,
          },
        },
        {
          "id": "2",
          "case": "Created a basic json with data",
          "time": {
            "unit": "MINUTE",
            "amount": 20,
          },
        },
        {
          "id": "3",
          "case": "Added basic layout to the page (table with data from json)",
          "time": {
            "unit": "MINUTE",
            "amount": 90,
          },
        },
      ],
      "plan": [
        {
          "id": "0",
          "case": "Add models",
          "time": {
            "unit": "MINUTE",
            "amount": 60,
          },
        },
        {
          "id": "1",
          "case": "Add get and post requests",
          "time": {
            "unit": "MINUTE",
            "amount": 60,
          },
        },
        {
          "id": "2",
          "case": "Add service layer",
          "time": {
            "unit": "MINUTE",
            "amount": 60,
          },
        },
      ],
      // eslint-disable-next-line max-len
      "problem": ["When adding eslint (typescript-eslint/prefer-optional-chain) rules, there was a conflict. I solved it by adding the projects property to parserOptions with the path to tsconfig."],
      "comment": ["Repeated table tags when creating it."],
      // eslint-disable-next-line max-len
      "new": ["Local json files can only be fetched if they are in a public folder. If they belong inside src, then imports should be used. It all depends on the paths."],
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