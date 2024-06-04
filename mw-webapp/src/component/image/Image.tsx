import {useState} from "react";
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
   */
  isZoomable?: boolean;

  /**
   * Large Image
   */
  isZoomed?: boolean;

  /**
   * Control Image outside
   */
  onOpenChange?: (arg: boolean) => void;
}

/**
 * Component for displaying images
 */
export const Image = (props: ImageProps) => {
  const imageClass = clsx(styles.image, props.className);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle modal state
   */
  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
  };

  const imageElement = (
    <img
      src={props.src}
      alt={props.alt}
      className={imageClass}
      data-cy={props.dataCy}
    />
  );

  return props.isZoomable
    ? (
      <Modal
        trigger={
          <img
            src={props.src}
            alt={props.alt}
            className={imageClass}
            data-cy={props.dataCy}
            onClick={() => handleOpenChange(true)}
          />
        }
        content={
          <img
            src={props.src}
            alt={props.alt}
            className={clsx(styles.zoomedImage, props.className)}
            onClick={() => handleOpenChange(false)}
          />
        }
        isOpen={props.isZoomed ?? isOpen}
        className={imageClass}
        cy={props.cy}
      />
    )
    : (
      imageElement
    );
};
