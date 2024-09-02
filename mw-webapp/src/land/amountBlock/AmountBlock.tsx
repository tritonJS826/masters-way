import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {AmountItem} from "src/land/amountBlock/amountItem/AmountItem";
import styles from "src/land/amountBlock/AmountBlock.module.scss";

/**
 * Amount item
 */
export interface AmountItem {

  /**
   * Item's ID
   */
  id: string;

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
 * Amount block props
 */
interface AmountBlockProps {

  /**
   * Amount items
   */
  amountItems: AmountItem[];
}

/**
 * Amount block
 */
export const AmountBlock = (props: AmountBlockProps) => {
  return (
    <HorizontalGridContainer className={styles.amountBlock}>
      {props.amountItems.map((amountItem) => (
        <AmountItem
          key={amountItem.id}
          amount={amountItem.amount}
          description={amountItem.description}
        />
      ))}
    </HorizontalGridContainer>
  );
};
