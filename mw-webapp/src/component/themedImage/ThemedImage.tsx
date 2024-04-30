import {Image} from "src/component/image/Image";
import {Theme} from "src/utils/ThemeWorker";

/**
 * ThemeSourcesMap
 */
interface ThemeSourcesMap {

  /**
   * Theme source
   */
  [Theme.DARK]: string;

  /**
   * Theme source
   */
  [Theme.LIGHT]: string;
}

/**
 * Get map of Theme to image source
 */
export const getMapThemeSources = (sources: ThemeSourcesMap): Map<Theme, string> => {
  return new Map([
    [Theme.DARK, sources[Theme.DARK]],
    [Theme.LIGHT, sources[Theme.LIGHT]],
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
  const imageSrc = props.sources.get(props.theme);

  return imageSrc && (
    <Image
      src={imageSrc}
      alt={props.name}
      className={props.className}
    />
  );
};
