import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";

/**
 * Icon dictionary
 */
const IconDictionary = {

  /**
   * Eye opened icon
   */
  EyeOpenedIcon: (params: IconProps) => <EyeOpenedIcon {...params} />,

  /**
   * Eye slash icon
   */
  EyeSlashedIcon: (params: IconProps) => <EyeSlashedIcon {...params} />,
};

/**
 * Icon className
 */
export enum IconClassName {
  SMALL = "small",
  MEDIUM = "medium"
}

/**
 * Icon props
 */
export interface IconProps {

  /**
   * Icon name
   */
  iconName: keyof typeof IconDictionary;

  /**
   * Icon's className {@link IconClassName}
   * @default IconClassName.MEDIUM
   */
  className: IconClassName;

}

/**
 * Icon
 */
export const Icon = (props: IconProps) => IconDictionary[props.iconName](props);
