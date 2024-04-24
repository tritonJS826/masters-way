import clsx from "clsx";
import {Image} from "src/component/image/Image";
import {Theme} from "src/utils/ThemeWorker";
import styles from "src/component/verticalContainer/VerticalContainer.module.scss";

/**
 * ThemedImage props
 */
interface ThemedImageProps {

  /**
   * Map of Theme to image source
   */
  sources: Map<Theme, string>;

  /**
   * Current theme
   */
  theme: Theme;

  /**
   * Additional custom class name
   */
  className?: string;

  /**
   * Name image to alt atribute
   */
  name: string;
}

/**
 * ThemedImage
 */
export const ThemedImage = (props: ThemedImageProps) => {
  const imageSrc =
    props.theme === Theme.DARK
      ? props.sources.get(Theme.LIGHT)
      : props.sources.get(Theme.DARK);

  return (
    imageSrc && (
      <Image
        src={imageSrc}
        alt={props.name}
        className={clsx(styles.themedImage, props.className)}
      />
    )
  );
};
