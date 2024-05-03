import {useState} from "react";
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
   * Should image open?
   */
  isShouldOpen?: boolean;
}

/**
 * Сomponent for displaying images
 */
export const Image = (props: ImageProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const className = clsx(styles.image, props.className);

  /**
   * Function full screen image
   */
  const onClickHandler = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div className={isOpen ? styles.imageWrapperFullScreen : ""}>
      <img
        tabIndex={0}
        src={props.src}
        alt={props.alt}
        className={className}
        data-cy={props.dataCy}
        onClick={props.isShouldOpen ? () => onClickHandler(true) : undefined}
        onBlur={() => onClickHandler(false)}
      />
    </div>
  );
};

