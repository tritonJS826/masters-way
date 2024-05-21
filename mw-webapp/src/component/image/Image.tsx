import {useState} from "react";
import {createPortal} from "react-dom";
import clsx from "clsx";
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
   * Enable image zooming on click
   */
  zoomable?: boolean;
}

/**
 * Component for displaying images
 */
export const Image = (props: ImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  /**
   * Handles the click event.
   */
  const handleClick = () => {
    if (props.zoomable) {
      setIsZoomed(!isZoomed);
    }
  };

  const className = clsx(styles.image, props.className, props.zoomable && styles.zoomable);

  /**
   * Creates a portal for displaying a zoomed image overlay.
   * If `isZoomed` is true, it renders an overlay with the zoomed image.
   * Otherwise, it returns null.
   */
  const createZoomedPortal = () => {
    if (isZoomed) {
      return createPortal(
        <div
          className={styles.zoomedOverlay}
          onClick={handleClick}
        >
          <img
            src={props.src}
            alt={props.alt}
            className={styles.zoomedImage}
          />
        </div>,
        document.body,
      );
    }

    return null;
  };

  return (
    <>
      <img
        src={props.src}
        alt={props.alt}
        className={className}
        data-cy={props.dataCy}
        onClick={handleClick}
      />
      {createZoomedPortal()}
    </>
  );
};
