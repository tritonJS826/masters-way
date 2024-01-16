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
}

/**
 * Сomponent for displaying images
 */
export const Image = (props: ImageProps) => {
  const className = clsx(styles.image, props.className);

  return (
    <img
      src={props.src}
      alt={props.alt}
      className={className}
    />
  );
};

