import {observer} from "mobx-react-lite";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {PricePlan, PricePlanType} from "src/component/pricingBlock/pricePlan/PricePlan";
import styles from "src/component/pricingBlock/PricingBlock.module.scss";

/**
 * Pricing block props
 */
interface PricingBlockProps {

  /**
   * Price plans data
   */
  pricePlans: PricePlanType[];

}

/**
 * Pricing block component
 */
export const PricingBlock = observer((props: PricingBlockProps) => {
  return (
    <HorizontalContainer className={styles.planItems}>
      {
        props.pricePlans.map((pricePlan) => (
          <PricePlan
            key={pricePlan.id}
            pricePlan={pricePlan}
          />
        ))
      }
    </HorizontalContainer>
  );
});
