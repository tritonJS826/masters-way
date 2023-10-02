import {useState} from "react";
import {Input} from "src/component/input/Input";
import {updateDayReport} from "src/component/table/helpers/updateDayReport";
import styles from "src/component/table/columns.module.scss";

interface DayReportProps {
  studentComments: string[];
  mentorComments: string[];
  learnedForToday: string[];
}

const INDEX_OF_CHECK_MARK = 0;

export const renderStringArray = (arrayItem: string, parentUuid: string, columnName: keyof DayReportProps, index: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(arrayItem);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    updateDayReport(text, parentUuid, columnName, index);
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      updateDayReport(text, parentUuid, columnName, index);
      setIsEditing(false);
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing
        ? (
          <Input
            type="text"
            value={text}
            autoFocus={true}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleEnter}
          />
        )
        : (
          (text !== "" && text !== " ") ?
            <span className={arrayItem[INDEX_OF_CHECK_MARK] === "✓" ? styles.completed : styles.notCompleted}>
              {text}
            </span>
            :
            <span className={styles.notCompleted}>
              &#8203;
            </span>
        )}
    </div>
  );
};