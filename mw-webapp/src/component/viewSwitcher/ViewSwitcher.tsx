import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconProps, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip, TooltipProps} from "src/component/tooltip/Tooltip";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/component/viewSwitcher/ViewSwitcher.module.scss";

/**
 * View option
 */
interface ViewOption {

  /**
   * View types
   */
  view: View;

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
  view: View;

  /**
   * Set view value
   */
  setView: (view: View) => void;

  /**
   * Array of view options
   */
  options: ViewOption[];
}

/**
 * ViewSwitcher component
 */
export const ViewSwitcher = (props: ViewSwitcherProps) => {
  return (
    <HorizontalContainer className={props.className}>
      {props.options.map((option) => (
        <Tooltip
          key={option.view}
          position={PositionTooltip.LEFT}
          content={option.tooltipContent}
        >
          <button
            className={clsx(styles.iconView, props.view === option.view && styles.activeView)}
            onClick={() => props.setView(option.view)}
          >
            <Icon
              size={IconSize.MEDIUM}
              name={option.iconName}
            />
          </button>
        </Tooltip>
      ))}
    </HorizontalContainer>
  );
};
