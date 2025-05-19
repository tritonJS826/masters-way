import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import styles from "src/component/pricingBlock/pricePlan/capabilityItem/CapabilityItem.module.scss";

/**
 * CApability item props
 */
interface CapabilityItemProps {

  /**
   * Pan's capability text
   */
  value: string;

  /**
   * Pan's capability amount
   */
  amount?: number | null;

  /**
   * Is available
   */
  isAvailable: boolean;
}

/**
 * Capability item component
 */
export const CapabilityItem = (props: CapabilityItemProps) => {
  return (
    <HorizontalContainer className={clsx(styles.capabilityItemContainer, !props.isAvailable && styles.unavailable)}>
      <Icon
        size={IconSize.SMALL}
        name={props.isAvailable ? "CheckIcon" : "RemoveIcon"}
        className={clsx(styles.icon)}
      />
      <p>
        {props.value}
        {props.amount !== 0 && props.amount !== null && ` (${props.amount})`}
      </p>
    </HorizontalContainer>
  );
};
