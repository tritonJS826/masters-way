import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/amountBlock/amountItem/AmountItem.module.scss";

/**
 *Amount item props
 */
interface AmountItemProps {

  /**
   * Item amount
   */
  amount: number;

  /**
   * Amount item description
   */
  description: string;
}

/**
 * Amount item component
 */
export const AmountItem = (props: AmountItemProps) => {
  return (
    <VerticalContainer className={styles.amountItemBlock}>
      <p className={styles.amount}>
        {`>${props.amount}`}
      </p>
      <p className={styles.amountDescription}>
        {props.description}
      </p>
    </VerticalContainer>
  );
};
