import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";

const IconDictionary = {EyeOpenedIcon, EyeSlashedIcon};

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
 * TODO: need refactor for possibility to use any icons, not only {@link EyeOpenedIcon} and {@link EyeSlashedIcon}
 */
export const Icon = (props: IconProps) => {
  return (
    <>
      {
        props.iconName === "EyeOpenedIcon" ?
          <IconDictionary.EyeOpenedIcon
            size={props.size}
            fill={props.fill}
            stroke={props.stroke}
            iconName={props.iconName}
          />
          :
          <IconDictionary.EyeSlashedIcon
            size={props.size}
            fill={props.fill}
            stroke={props.stroke}
            iconName={props.iconName}
          />

      }
    </>
  );
};

