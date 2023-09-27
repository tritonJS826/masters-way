import {useEffect} from "react";
import {Button} from "../button/Button";
import {Title} from "../title/Title";
import {HeadingLevel} from "../title/Title";
import styles from "./Notice.module.scss";

const MILLISECONDS = 1000;

export interface NoticeProps {
  /**
   * ID for notification, it will be help closing notice by button (number, which we will be use like string)
   */
  id: string;
  /**
  * Title for notice (text)
  */
  title: string;
  /**
   * Description for notice (text)
   */
  description: string;
  /**
   * Type for notice, like 'Error', 'Ok', 'Warning' (text)
   */
  type: string;
  /**
   * Timer for automaticle closing (seconds)
   */
  timer: number;
  /**
   * Callback which close the notification
   */
  closeNotice: (id: string) => void;
}

export const Notice = (props: NoticeProps) => {

  const {id, title, description, type, timer, closeNotice} = props;

  const millisecondsTimer = timer * MILLISECONDS;

  useEffect(() => {
    setTimeout(() => closeNotice(id), millisecondsTimer);
  }, []);

  return (
    <article
      className={[styles.notice, styles[type]].join(" ")}
      id={id}
    >
      <div className={styles.crose_box}>
        <img
          src="./"
          alt="close_img"
        />
      </div>
      <Title
        level={HeadingLevel.h3}
        className={styles.title}
        text={title}
      />
      <p className={[styles.description].join(" ")}>
        {description}
      </p>
      <Button
        value={"Ok"}
        onClick={() => closeNotice(id)}
      />
    </article>
  );
};
