import clsx from "clsx";
import {BookIcon} from "src/assets/icons/BookIcon";
import {BurgerMenu} from "src/assets/icons/BurgerMenu";
import {ChevronIcon} from "src/assets/icons/ChevronIcon";
import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";
import {FileIcon} from "src/assets/icons/FileIcon";
import {GithubIcon} from "src/assets/icons/GithubIcon";
import {GlobeIcon} from "src/assets/icons/GlobeIcon";
import {GridViewIcon} from "src/assets/icons/GridViewIcon";
import {HomeIcon} from "src/assets/icons/HomeIcon";
import {InfoIcon} from "src/assets/icons/InfoIcon";
import {LinkedinIcon} from "src/assets/icons/LinkedinIcon";
import {MoonIcon} from "src/assets/icons/MoonIcon";
import {MoreVertical} from "src/assets/icons/MoreVertical";
import {PlusIcon} from "src/assets/icons/PlusIcon";
import {RemoveIcon} from "src/assets/icons/RemoveIcon";
import {SearchIcon} from "src/assets/icons/SearchIcon";
import {SettingsIcon} from "src/assets/icons/SettingsIcon";
import {StarIcon} from "src/assets/icons/StarIcon";
import {SunIcon} from "src/assets/icons/SunIcon";
import {TableViewIcon} from "src/assets/icons/TableViewIcon";
import {UserIcon} from "src/assets/icons/UserIcon";
import {UsersIcon} from "src/assets/icons/UsersIcon";
import {WayIcon} from "src/assets/icons/WayIcon";
import {YoutubeIcon} from "src/assets/icons/YoutubeIcon";
import styles from "src/component/icon/Icon.module.scss";

/**
 * Icon dictionary
 */
export const IconDictionary = {

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
   * Github icon
   */
  GithubIcon: (params: IconProps) => <GithubIcon {...params} />,

  /**
   * Linkedin icon
   */
  LinkedinIcon: (params: IconProps) => <LinkedinIcon {...params} />,

  /**
   * Youtube icon
   */
  YoutubeIcon: (params: IconProps) => <YoutubeIcon {...params} />,

  /**
   * Home icon
   */
  HomeIcon: (params: IconProps) => <HomeIcon {...params} />,

  /**
   * Users icon
   */
  UsersIcon: (params: IconProps) => <UsersIcon {...params} />,

  /**
   * Way icon
   */
  WayIcon: (params: IconProps) => <WayIcon {...params} />,

  /**
   * Book icon
   */
  BookIcon: (params: IconProps) => <BookIcon {...params} />,

  /**
   * Youtube icon
   */
  SettingsIcon: (params: IconProps) => <SettingsIcon {...params} />,

  /**
   * Search icon
   */
  SearchIcon: (params: IconProps) => <SearchIcon {...params} />,

  /**
   * User icon
   */
  UserIcon: (params: IconProps) => <UserIcon {...params} />,

  /**
   * Remove icon
   */
  RemoveIcon: (params: IconProps) => <RemoveIcon {...params} />,

  /**
   * Chevron icon
   */
  ChevronIcon: (params: IconProps) => <ChevronIcon {...params} />,

  /**
   * Chevron icon
   */
  InfoIcon: (params: IconProps) => <InfoIcon {...params} />,
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

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

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
