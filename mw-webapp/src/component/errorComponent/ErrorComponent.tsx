import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/errorComponent/ErrorComponent.module.scss";

/**
 * Error component props
 */
interface ErrorComponentProps {

  /**
   * Error component title
   */
  title: string;

  /**
   * Error component description
   */
  description: string;
}

/**
 * Error component
 */
export const ErrorComponent = (props: ErrorComponentProps) => {

  return (
    <VerticalContainer className={styles.container}>
      <Title
        text={props.title}
        level={HeadingLevel.h1}
        placeholder={""}
      />
      <div className={styles.description}>
        {props.description}
      </div>
    </VerticalContainer>
  );
};
