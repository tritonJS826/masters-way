import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/errorComponent/ErrorComponent.module.scss";

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
      <div className={styles.description}>
        {props.description}
      </div>
    </VerticalContainer>
  );
};
