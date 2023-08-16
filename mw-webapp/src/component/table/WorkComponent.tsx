import {Work} from "src/model/deal/work/Work";

export interface WorkComponentProps {
  work: Work[];
}

export const WorkComponent = (props: WorkComponentProps) => {
  return (
    <ol>
      {props.work.map((el) => {
        return (
          <li key={el.id}>
            {`${el.case} (${el.time.amount} ${el.time.unit})`}
          </li>
        );
      })}
    </ol>
  );
};