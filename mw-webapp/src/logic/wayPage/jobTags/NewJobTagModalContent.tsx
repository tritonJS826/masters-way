import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input} from "src/component/input/Input";
import styles from "src/logic/wayPage/jobTags/NewJobTagModalContent.module.scss";

/**
 * New job tag modal content props
 */
interface NewJobTagModalContentProps {

  /**
   * Close modal
   */
  close: () => void;

  /**
   * Create new job tag
   */
  createNewJobTag: (newJobTag: string) => Promise<void>;
}

/**
 * New job done modal content
 */
export const NewJobTagModalContent = (props: NewJobTagModalContentProps) => {
  const [newJobTagName, setNewJobTagName] = useState<string>("");

  return (
    <div>
      <Input
        type="text"
        value={newJobTagName}
        autoFocus={true}
        onChange={setNewJobTagName}
      />
      <HorizontalContainer className={styles.buttons}>
        <DialogClose asChild>
          <Button
            value="Cancel"
            onClick={props.close}
          />
        </DialogClose>
        <DialogClose asChild>
          <Button
            value="Create"
            onClick={() => props.createNewJobTag(newJobTagName)}
          />
        </DialogClose>
      </HorizontalContainer>
    </div>
  );
};
