import clsx from "clsx";
import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";
import {MoonIcon} from "src/assets/icons/MoonIcon";
import {SunIcon} from "src/assets/icons/SunIcon";
import styles from "src/component/icon/Icon.module.scss";

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

  /**
   * Sun icon
   */
  SunIcon: (params: IconProps) => <SunIcon {...params} />,

  /**
   * Moon icon
   */
  MoonIcon: (params: IconProps) => <MoonIcon {...params} />,
};

/**
 * Icon size
 */
export enum IconSize {
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
  name: keyof typeof IconDictionary;

  /**
   * Icon's size {@link IconSize}
   * @default {@link IconSize.MEDIUM}
   */
  size: IconSize;

  /**
   * Custom className
   */
  className?: string;

}

/**
 * Icon
 */
export const Icon = (props: IconProps) => {
  const className = clsx(
    styles.icon,
    styles[props.size],
    props.className,
  );

  return IconDictionary[props.name]({...props, className});
};
