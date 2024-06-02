import clsx from "clsx";
import {Modal} from "src/component/modal/Modal";
import styles from "src/component/image/Image.module.scss";

/**
 * Props for the Image component
 */
interface ImageProps {

  /**
   * Image source
   */
  src: string;

  /**
   * Image alt text
   */
  alt: string;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Enlarge Image
   */
  isZoomed?: boolean;
}

/**
 * Component for displaying images
 */
export const Image = ({src, alt, className, dataCy, isZoomed = false}: ImageProps) => {
  const imageClass = clsx(styles.image, className);

  const imageElement = (
    <img
      src={src}
      alt={alt}
      className={imageClass}
      data-cy={dataCy}
    />
  );

  return isZoomed
    ? (
      <Modal
        trigger={imageElement}
        content={imageElement}
        className={imageClass}
      />
    )
    : (
      imageElement
    );
};
