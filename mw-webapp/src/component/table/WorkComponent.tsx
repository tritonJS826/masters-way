import {WorkDone} from "src/model/report/workDone/WorkDone";

export interface WorkComponentProps {
  work: WorkDone[];
}

export const WorkComponent = (props: WorkComponentProps) => {
  return (
    <ol>
      {props.work.map((el) => {
        return (
          <li key={el.id}>
            {`${el.todoItem} (${el.time.getFullTime})`}
          </li>
        );
      })}
    </ol>
  );
};