
import clsx from "clsx";
import {Icon, IconProps, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip, TooltipProps} from "src/component/tooltip/Tooltip";
import styles from "src/component/viewSwitcher/ViewSwitcher.module.scss";

/**
 * View types
 */
export type ViewTypes = "Card" | "Table";

/**
 * View option
 */
interface ViewOption {

  /**
   * View types
   */
  viewType: ViewTypes;

  /**
   * Tooltip's content
   */
  tooltipContent: TooltipProps["content"];

  /**
   * Icon name
   */
  iconName: IconProps["name"];
}

/**
 * ViewSwitcher props
 */
interface ViewSwitcherProps {

  /**
   * Custom class name
   */
  className?: string;

  /**
   * View value
   */
  viewType: ViewTypes;

  /**
   * Set view value
   */
  setViewType: (viewType: ViewTypes) => void;

  /**
   * Array of view options
   */
  viewOptions: ViewOption[];
}

/**
 * ViewSwitcher component
 */
export const ViewSwitcher = (props: ViewSwitcherProps) => {
  return (
    <div className={clsx(styles.viewSwitcher, props.className)}>
      {props.viewOptions.map((option) => (
        <Tooltip
          key={option.viewType}
          position={PositionTooltip.LEFT}
          content={option.tooltipContent}
        >
          <button
            className={clsx(styles.iconView, props.viewType === option.viewType && styles.activeView)}
            onClick={() => props.setViewType(option.viewType)}
          >
            <Icon
              size={IconSize.MEDIUM}
              name={option.iconName}
            />
          </button>
        </Tooltip>
      ))}
    </div>
  );
};
