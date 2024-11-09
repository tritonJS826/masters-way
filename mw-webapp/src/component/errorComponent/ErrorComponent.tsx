import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/errorComponent/ErrorComponent.module.scss";

/**
 * Error component props
 */
interface ErrorComponentProps {

  /**
   * Error component text
   */
  text: string;

  /**
   * Error component description
   */
  description: string;
}

/**
 * Error component render info about private pages
 */
export const ErrorComponent = (props: ErrorComponentProps) => {

  return (
    <VerticalContainer className={styles.container}>
      <Title
        text={props.text}
        level={HeadingLevel.h1}
        placeholder={""}
      />
      <div className={styles.description}>
        {props.description}
      </div>
    </VerticalContainer>
  );
};
