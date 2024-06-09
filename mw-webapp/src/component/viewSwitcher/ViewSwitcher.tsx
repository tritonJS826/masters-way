import {ReactElement, ReactNode} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/component/viewSwitcher/ViewSwitcher.module.scss";

type tooltipContent = string | ReactNode | ReactElement;

/**
 * View option
 */
export interface ViewOption {

  /**
   * View value
   */
  view: View;

  /**
   * Tooltip's content
   */
  tooltipContent: tooltipContent;

  /**
   * Icon name
   */
  iconName: keyof typeof IconDictionary;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * ViewSwitcher props
 */
export interface ViewSwitcherProps {

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

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Card view option
 */
export const renderViewCardOption = (tooltipContent: tooltipContent): ViewOption => {
  return {
    view: View.Card,
    tooltipContent,
    iconName: "GridViewIcon",
  };
};

/**
 * Card table option
 */
export const renderViewTableOption = (tooltipContent: tooltipContent): ViewOption => {
  return {
    view: View.Table,
    tooltipContent,
    iconName: "TableViewIcon",
  };
};

/**
 * ViewSwitcher component
 */
export const ViewSwitcher = (props: ViewSwitcherProps) => {
  return (
    <HorizontalContainer
      className={props.className}
      dataCy={props.dataCy}
    >
      {props.options.map((option) => (
        <Tooltip
          key={option.view}
          position={PositionTooltip.LEFT}
          content={option.tooltipContent}
          dataCy={option.dataCy}
        >
          <Button
            className={clsx(props.view === option.view && styles.activeView)}
            onClick={() => props.setView(option.view)}
            buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
            value={
              <Icon
                size={IconSize.MEDIUM}
                name={option.iconName}
              />
            }
          />
        </Tooltip>
      ))}
    </HorizontalContainer>
  );
};
