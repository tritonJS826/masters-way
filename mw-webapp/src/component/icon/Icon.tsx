import clsx from "clsx";
import {BookIcon} from "src/assets/icons/BookIcon";
import {BurgerMenu} from "src/assets/icons/BurgerMenu";
import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";
import {FileIcon} from "src/assets/icons/FileIcon";
import {GithubIcon} from "src/assets/icons/GithubIcon";
import {GlobeIcon} from "src/assets/icons/GlobeIcon";
import {GridViewIcon} from "src/assets/icons/GridViewIcon";
import {HomeIcon} from "src/assets/icons/HomeIcon";
import {LinkedinIcon} from "src/assets/icons/LinkedinIcon";
import {MoonIcon} from "src/assets/icons/MoonIcon";
import {MoreVertical} from "src/assets/icons/MoreVertical";
import {PlusIcon} from "src/assets/icons/PlusIcon";
import {SettingsIcon} from "src/assets/icons/SettingsIcon";
import {StarIcon} from "src/assets/icons/StarIcon";
import {SunIcon} from "src/assets/icons/SunIcon";
import {TableViewIcon} from "src/assets/icons/TableViewIcon";
import {UsersIcon} from "src/assets/icons/UsersIcon";
import {WayIcon} from "src/assets/icons/WayIcon";
import {YoutubeIcon} from "src/assets/icons/YoutubeIcon";
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

  /**
   * Star icon
   */
  StarIcon: (params: IconProps) => <StarIcon {...params} />,

  /**
   * GridView icon
   */
  GridViewIcon: (params: IconProps) => <GridViewIcon {...params} />,

  /**
   * TableView icon
   */
  TableViewIcon: (params: IconProps) => <TableViewIcon {...params} />,

  /**
   * File icon
   */
  FileIcon: (params: IconProps) => <FileIcon {...params} />,

  /**
   * Plus icon
   */
  PlusIcon: (params: IconProps) => <PlusIcon {...params} />,

  /**
   * MoreVertical icon
   */
  MoreVertical: (params: IconProps) => <MoreVertical {...params} />,

  /**
   * Burger menu icon
   */
  BurgerMenuIcon: (params: IconProps) => <BurgerMenu {...params} />,

  /**
   * Globe icon
   */
  GlobeIcon: (params: IconProps) => <GlobeIcon {...params} />,

  /**
   * Globe icon
   */
  GithubIcon: (params: IconProps) => <GithubIcon {...params} />,

  /**
   * Globe icon
   */
  LinkedinIcon: (params: IconProps) => <LinkedinIcon {...params} />,

  /**
   * Youtube icon
   */
  YoutubeIcon: (params: IconProps) => <YoutubeIcon {...params} />,

  /**
   * Youtube icon
   */
  HomeIcon: (params: IconProps) => <HomeIcon {...params} />,

  /**
   * Youtube icon
   */
  UsersIcon: (params: IconProps) => <UsersIcon {...params} />,

  /**
   * Youtube icon
   */
  WayIcon: (params: IconProps) => <WayIcon {...params} />,

  /**
   * Youtube icon
   */
  BookIcon: (params: IconProps) => <BookIcon {...params} />,

  /**
   * Youtube icon
   */
  SettingsIcon: (params: IconProps) => <SettingsIcon {...params} />,
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
