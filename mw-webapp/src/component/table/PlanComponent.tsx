import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";

export interface PlanComponentProps {
  plan: PlanForTomorrow[];
}

export const PlanComponent = (props: PlanComponentProps) => {
  return (
    <ol>
      {props.plan.map((el) => {
        return (
          <li key={el.id}>
            {`${el.todoItem} (${el.time.getFullTime})`}
          </li>
        );
      })}
    </ol>
  );
};