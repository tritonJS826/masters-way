import {useState} from "react";
import {Input} from "src/component/input/Input";
import {updateJobDone} from "src/component/table/helpers/updateJobDone";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import styles from "src/component/table/columns.module.scss";

const INDEX_OF_CHECK_MARK = 0;

export const renderObjectArrayItem = (arrayItem: JobDone | PlanForNextPeriod | CurrentProblem, getFullItem?: string) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(getFullItem);
  const handleDoubleClick = () => {
    setIsEdit(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Const updateDayReport = async () => {
  //   const updatedJobDone: JobDoneDTO = {
  //     uuid: arrayItem.uuid,
  //     description: text!,
  //     time: 30,
  //     timeUnit: TimeUnit.minute,
  //   };
  //   await JobDoneService.updateJobDoneDTO(updatedJobDone, arrayItem.uuid);
  // };

  const handleBlur = async () => {
    setIsEdit(false);
    // UpdateDayReport();
    updateJobDone(text!, arrayItem.uuid);
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      // UpdateDayReport();
      updateJobDone(text!, arrayItem.uuid);
      setIsEdit(false);
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEdit
        ? (
          <Input
            type="text"
            value={text ?? ""}
            autoFocus={true}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleEnter}
          />
        )
        : (
          <span className={getFullItem![INDEX_OF_CHECK_MARK] === "✓" ? styles.completed : styles.notCompleted}>
            {text}
          </span>
        )}
    </div>
  );
};
