import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";

const IconDictionary = {
  EyeOpenedIcon,
  EyeSlashedIcon,
};

/**
 * Icon props
 */
export interface IconProps {

  /**
   * Width and height of icon
   */
  size: number;

  /**
   * Fill color
   */
  fill: string;

  /**
   * Stroke color
   */
  stroke: string;

  /**
   * Icon name
   */
  iconName: keyof typeof IconDictionary;

}

/**
 * Icon
 */
export const Icon = (props: IconProps) => {
  const {iconName} = props;

  const Icons: Record<IconProps["iconName"], JSX.Element> = {
    EyeOpenedIcon: <EyeOpenedIcon {...props} />,
    EyeSlashedIcon: <EyeSlashedIcon {...props} />,
  };

  return Icons[iconName];
};

