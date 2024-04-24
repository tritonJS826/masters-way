import {Image} from "src/component/image/Image";
import {Theme} from "src/utils/ThemeWorker";

/**
 * Get map of Theme to image source
 */
export const getMapThemeSources = (imageDark: string, imageLight: string): Map<Theme, string> => {
  return new Map([
    [Theme.DARK, imageDark],
    [Theme.LIGHT, imageLight],
  ]);
};

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
        className={props.className}
      />
    )
  );
};
