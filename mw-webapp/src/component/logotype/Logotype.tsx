import clsx from "clsx";
import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import logoPurple from "src/assets/mastersWayLogoPurple.svg";
import {Image} from "src/component/image/Image";
import {useGlobalContext} from "src/GlobalContext";
import {Theme} from "src/utils/ThemeWorker";
import styles from "src/component/verticalContainer/VerticalContainer.module.scss";

export const LOGO_TEXT = "Master's way";

/**
 * Logotype props
 */
interface LogotypeProps {

  /**
   * Additional custom class name
   */
  className?: string;

  /**
   * IsLogotype has another secondary color
   */
  isColorSecondary?: boolean;
}

/**
 * Logotype
 */
export const Logotype = (props: LogotypeProps) => {
  const {theme} = useGlobalContext();

  const darkColorIcon = props.isColorSecondary ? logoPurple : logo;

  return (
    <Image
      src={theme === Theme.DARK ? logoLight : darkColorIcon}
      alt={LOGO_TEXT}
      className={clsx(styles.logo, props.className)}
    />
  );
};
