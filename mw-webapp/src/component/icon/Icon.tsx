import clsx from "clsx";
import {ActivityIcon} from "src/assets/icons/ActivityIcon";
import {AppStoreIcon} from "src/assets/icons/AppStoreIcon";
import {ArrowRightIcon} from "src/assets/icons/ArrowRight";
import {AwardIcon} from "src/assets/icons/AwardIcon";
import {BellIcon} from "src/assets/icons/BellIcon";
import {BookIcon} from "src/assets/icons/BookIcon";
import {BoxIcon} from "src/assets/icons/BoxIcon";
import {BurgerMenu} from "src/assets/icons/BurgerMenu";
import {CheckIcon} from "src/assets/icons/Check";
import {ChevronIcon} from "src/assets/icons/ChevronIcon";
import {ClockIcon} from "src/assets/icons/ClockIcon";
import {DollarIcon} from "src/assets/icons/DollarIcon";
import {DownloadIcon} from "src/assets/icons/DownloadIcon";
import {EyeOpenedIcon} from "src/assets/icons/EyeOpenedIcon";
import {EyeSlashedIcon} from "src/assets/icons/EyeSlashedIcon";
import {FileIcon} from "src/assets/icons/FileIcon";
import {FlagIcon} from "src/assets/icons/FlagIcon";
import {GiftIcon} from "src/assets/icons/GiftIcon";
import {GlobeIcon} from "src/assets/icons/GlobeIcon";
import {GooglePlayIcon} from "src/assets/icons/GooglePlayIcon";
import {GridViewIcon} from "src/assets/icons/GridViewIcon";
import {HomeIcon} from "src/assets/icons/HomeIcon";
import {InfoIcon} from "src/assets/icons/InfoIcon";
import {LinkedinIcon} from "src/assets/icons/LinkedinIcon";
import {MessageIcon} from "src/assets/icons/MessageIcon";
import {MinusIcon} from "src/assets/icons/MinusIcon";
import {MoonIcon} from "src/assets/icons/MoonIcon";
import {MoreVertical} from "src/assets/icons/MoreVertical";
import {PatreonIcon} from "src/assets/icons/PatreonIcon";
import {PlusIcon} from "src/assets/icons/PlusIcon";
import {RemoveIcon} from "src/assets/icons/RemoveIcon";
import {SearchIcon} from "src/assets/icons/SearchIcon";
import {SettingsIcon} from "src/assets/icons/SettingsIcon";
import {StarIcon} from "src/assets/icons/StarIcon";
import {SunIcon} from "src/assets/icons/SunIcon";
import {SunsetIcon} from "src/assets/icons/SunsetIcon";
import {TableViewIcon} from "src/assets/icons/TableViewIcon";
import {TrashIcon} from "src/assets/icons/TrashIcon";
import {TrendingUpIcon} from "src/assets/icons/TrendingUpIcon";
import {UploadIcon} from "src/assets/icons/UploadIcon";
import {UserCheckIcon} from "src/assets/icons/UserCheckIcon";
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
   * Minus icon
   */
  MinusIcon: (params: IconProps) => <MinusIcon {...params} />,

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

  /**
   * Flag icon
   */
  FlagIcon: (params: IconProps) => <FlagIcon {...params} />,

  /**
   * GooglePlay icon
   */
  GooglePlayIcon: (params: IconProps) => <GooglePlayIcon {...params} />,

  /**
   * AppStore icon
   */
  AppStoreIcon: (params: IconProps) => <AppStoreIcon {...params} />,

  /**
   * Arrow right icon
   */
  ArrowRightIcon: (params: IconProps) => <ArrowRightIcon {...params} />,

  /**
   * Gift icon
   */
  GiftIcon: (params: IconProps) => <GiftIcon {...params} />,

  /**
   * Clock icon
   */
  ClockIcon: (params: IconProps) => <ClockIcon {...params} />,

  /**
   * TrendingUp icon
   */
  TrendingUpIcon: (params: IconProps) => <TrendingUpIcon {...params} />,

  /**
   * Activity icon
   */
  ActivityIcon: (params: IconProps) => <ActivityIcon {...params} />,

  /**
   * Box icon
   */
  BoxIcon: (params: IconProps) => <BoxIcon {...params} />,

  /**
   * Dollar icon
   */
  DollarIcon: (params: IconProps) => <DollarIcon {...params} />,

  /**
   * Award icon
   */
  AwardIcon: (params: IconProps) => <AwardIcon {...params} />,

  /**
   * Check icon
   */
  CheckIcon: (params: IconProps) => <CheckIcon {...params} />,

  /**
   * Upload icon
   */
  UploadIcon: (params: IconProps) => <UploadIcon {...params} />,

  /**
   * Download icon
   */
  DownloadIcon: (params: IconProps) => <DownloadIcon {...params} />,

  /**
   * Sunset icon
   */
  SunsetIcon: (params: IconProps) => <SunsetIcon {...params} />,

  /**
   * Bell icon
   */
  BellIcon: (params: IconProps) => <BellIcon {...params} />,

  /**
   * Trash icon
   */
  TrashIcon: (params: IconProps) => <TrashIcon {...params} />,

  /**
   * UserCheck icon
   */
  UserCheckIcon: (params: IconProps) => <UserCheckIcon {...params} />,

  /**
   * Patreon icon
   */
  PatreonIcon: (params: IconProps) => <PatreonIcon {...params} />,

  /**
   * Message icon
   */
  MessageIcon: (params: IconProps) => <MessageIcon {...params} />,

};

/**
 * Icon size
 */
export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big"
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
   * @default IconSize.MEDIUM
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
