import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";

/**
 * Icon dictionary
 */
const IconDictionary = (params: IconProps) => {
  const icons: Record<IconProps["iconName"], JSX.Element> = {
    EyeOpenedIcon: <EyeOpenedIcon {...params} />,
    EyeSlashedIcon: <EyeSlashedIcon {...params} />,
  };

  return icons;
};

/**
 * Icon's width and height
 */
export enum IconSize {
  SMALL = "15px",
  MEDIUM = "25px",
}

/**
 * Icon's width and height
 */
export enum IconFill {
  NONE = "none",
}

/**
 * Icon's width and height
 */
export enum IconStroke {
  PRIMARY = "var(--secondaryBorderColor)",
}

/**
 * Icon props
 */
export interface IconProps {

  /**
   * Width and height of icon
   */
  size: IconSize;

  /**
   * Icon's fill color
   */
  fill: IconFill;

  /**
   * Icon's stroke color
   */
  stroke: IconStroke;

  /**
   * Icon name
   */
  iconName: "EyeOpenedIcon" | "EyeSlashedIcon";

}

/**
 * Icon
 */
export const Icon = (props: IconProps) => {
  const icon = IconDictionary(props)[props.iconName];

  return icon;
};

