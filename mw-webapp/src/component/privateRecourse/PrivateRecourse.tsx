import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/privateRecourse/PrivateRecourse.module.scss";

/**
 * Private recourse props
 */
interface ErrorComponentProps {

  /**
   * Private recourse's text
   */
  text: string;

  /**
   * Private recourse's description
   */
  description: string;
}

/**
 * Private recourse render info about private pages
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
