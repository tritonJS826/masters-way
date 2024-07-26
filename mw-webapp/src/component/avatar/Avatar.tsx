import * as AvatarRadix from "@radix-ui/react-avatar";
import clsx from "clsx";
import styles from "src/component/avatar/Avatar.module.scss";

/**
 * Avatar's size (width)
 */
export enum AvatarSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
  LARGE = "large",
}

/**
 * Props for the Avatar component
 */
interface AvatarProps {

  /**
   * Avatar source
   */
  src: string | null;

  /**
   * Avatar alt text. Name could consist of 2 words. Initials will be visible if there is no image
   */
  alt: string;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Avatar width
   */
  size?: AvatarSize;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Get initials by phrase
 * @returns string 2 capitalized letters
 */
const getInitials = (name: string): string => {
  const words = name.split(" ");
  const SECOND_WORD_INDEX = 1;
  const THIRD_WORD_INDEX = 2;
  if (words.length === 0) {
    return "??";
  }

  const isOnlyOneWord = words.length === SECOND_WORD_INDEX;
  if (isOnlyOneWord) {
    return words[0].slice(0, THIRD_WORD_INDEX).toUpperCase();
  }

  // More than 1 words
  return `${words[0][0]}${words[SECOND_WORD_INDEX][0]}`.toUpperCase();
};

/**
 * Component for displaying Avatars
 */
export const Avatar = (props: AvatarProps) => {
  const initials = getInitials(props.alt);

  return (
    <AvatarRadix.Root
      className={clsx(styles.AvatarRoot,
        styles[props.size ?? AvatarSize.SMALL],
        props.className)}
      data-cy={props.dataCy}
    >
      <AvatarRadix.Image
        className={styles.AvatarImage}
        src={props.src ?? ""}
        alt={initials}
      />
      <AvatarRadix.Fallback
        className={styles.AvatarFallback}
        delayMs={600}
      >
        {initials}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );

};

