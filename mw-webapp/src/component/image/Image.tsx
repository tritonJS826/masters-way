import clsx from "clsx";
import {Modal} from "src/component/modal/Modal";
import styles from "src/component/image/Image.module.scss";

/**
 * Props for the Image component
 */
interface ImageProps
{

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
  enlargeImage?: boolean;

  /**
   * Enlarge Image Styles
   */
  enlargeClassName?: string;
}

/**
 * Сomponent for displaying images
 */
export const Image = (props: ImageProps) => {
  const className = clsx(styles.image, props.className);
  const enlargeClassName = clsx(styles.image, props.enlargeClassName);

  return (
    props.enlargeImage
      ? (
        <Modal
          trigger={
            <img
              src={props.src}
              alt={props.alt}
              className={className}
              data-cy={props.dataCy}
            />
          }
          content={
            <img
              src={props.src}
              alt={props.alt}
              className={enlargeClassName}
              data-cy={props.dataCy}
            />
          }
          className={enlargeClassName}
        />
      )
      : (
        <img
          src={props.src}
          alt={props.alt}
          className={className}
          data-cy={props.dataCy}
        />
      )
  );
};
