import clsx from "clsx";
import {Cy, Modal} from "src/component/modal/Modal";
import styles from "src/component/image/Image.module.scss";

/**
 * Data attributes for cypress testing
 */
interface CyDataImage extends Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Props for the Image component
 */
interface ImageProps {

  /**
   * Data attributes for cypress testing
   */
  cy?: CyDataImage;

  /**
   * Image source
   */
  src: string;

  /**
   * Image alt text
   */
  alt: string;

  /**
   * Class name for the image
   */
  className?: string;

  /**
   * Class name for zoomable image
   */
  classNameInModal?: string;

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
  const imageElement = (
    <img
      src={props.src}
      alt={props.alt}
      className={clsx(styles.image, props.className)}
      data-cy={props.cy?.dataCy}
    />
  );

  const imageInModalElement = (
    <img
      src={props.src}
      alt={props.alt}
      className={clsx(props.classNameInModal)}
      data-cy={props.cy?.dataCy}
    />
  );

  if (props.isZoomable) {
    return (
      <Modal
        cy={props.cy}
        trigger={imageElement}
        content={imageInModalElement}
        contentClassName={clsx(styles.content, props.classNameInModal)}
      />
    );
  }

  return imageElement;

};
