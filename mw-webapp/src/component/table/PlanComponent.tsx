import {Work} from "src/model/deal/work/Work";

export interface PlanComponentProps {
  plan: Work[];
}

export const PlanComponent = (props: PlanComponentProps) => {
  return (
    <ol>
      {props.plan.map((el) => {
        return (
          <li key={el.id}>
            {`${el.case} (${el.time.amount} ${el.time.unit})`}
          </li>
        );
      })}
    </ol>
  );
};