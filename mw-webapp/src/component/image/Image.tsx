import clsx from "clsx";
import {Cy, Modal} from "src/component/modal/Modal";
import styles from "src/component/image/Image.module.scss";

/**
 * Props for the Image component
 */
interface ImageProps {

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

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
   * Image respond to clicks
   * @default false
   */
  isZoomable?: boolean;
}

/**
 * Component for displaying images
 */
export const Image = (props: ImageProps) => {
  const imageClass = clsx(styles.image, props.className);

  const imageElement = (
    <img
      src={props.src}
      alt={props.alt}
      className={imageClass}
      data-cy={props.dataCy}
    />
  );

  if (props.isZoomable) {
    return (
      <Modal
        cy={props.cy}
        trigger={imageElement}
        content={imageElement}
        className={imageClass}
      />
    );
  }

  return imageElement;

};
