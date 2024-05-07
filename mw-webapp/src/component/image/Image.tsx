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
   * Should image open
   */
  isShouldOpen?: boolean;
}

/**
 * Сomponent for displaying images
 */
export const Image = (props: ImageProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const className = clsx(isOpen ? styles.imageFullScreen : styles.image, props.className);

  return (
    <div className={isOpen ? styles.imageWrapperFullScreen : ""}>
      {isOpen && <button
        className={styles.closeImageButton}
        onClick={() => setIsOpen(false)}
      >
        CLOSE
      </button>}
      <img
        tabIndex={0}
        src={props.src}
        alt={props.alt}
        className={className}
        data-cy={props.dataCy}
        onClick={props.isShouldOpen ? () => setIsOpen(true) : undefined}
        onBlur={() => setIsOpen(false)}
      />
    </div>

  );
};

