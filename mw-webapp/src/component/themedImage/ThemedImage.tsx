import {Image} from "src/component/image/Image";
// TODO: get rid of stores in the components
import {Theme} from "src/globalStore/ThemeStore";

/**
 * ThemeSourcesMap
 */
interface ThemeSourcesMap {

  /**
   * Theme dark source
   */
  [Theme.DARK]: string;

  /**
   * Theme light source
   */
  [Theme.LIGHT]: string;

    /**
     * Theme obsidian source
     */
    [Theme.OBSIDIAN]: string;
}

/**
 * Get map of Theme to image source
 */
export const getMapThemeSources = (sources: ThemeSourcesMap): Map<Theme, string> => {
  return new Map([
    [Theme.DARK, sources[Theme.DARK]],
    [Theme.LIGHT, sources[Theme.LIGHT]],
    [Theme.OBSIDIAN, sources[Theme.OBSIDIAN]],
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

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * ThemedImage
 */
export const ThemedImage = (props: ThemedImageProps) => {
  const imageSrc = props.sources.get(props.theme);

  return (
    <Image
      src={imageSrc || ""}
      alt={props.name}
      className={props.className}
      cy={{dataCy: props.dataCy}}
    />
  );
};
