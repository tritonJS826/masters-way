import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/videoBlock/VideoBlock.module.scss";

/**
 * Video block props
 */
interface VideoBlockProps {

  /**
   * Title
   */
  title?: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Video path
   */
  videoPath: string;

  /**
   * CTA button value
   */
  buttonValue: string;

  /**
   * Callback triggered on CTA button click
   */
  onCLick: () => void;

}

/**
 * Video block widget
 */
export const VideoBlock = (props: VideoBlockProps) => {
  return (
    <VerticalContainer className={styles.videoBlock}>
      {props.title && (
        <Title
          classNameHeading={styles.title}
          level={HeadingLevel.h2}
          text={props.title}
          placeholder=""
        />
      )}

      <p className={styles.titleDescription}>
        {props.description}
      </p>
      <div className={styles.videoContainer}>
        <div className={styles.videoResponsiveContainer}>
          <iframe
            src={props.videoPath}
            title="Video how to create training with AI "
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
            className={styles.video}
          />
        </div>
      </div>
      <Button
        buttonType={ButtonType.PRIMARY}
        value={props.buttonValue}
        icon={
          <Icon
            size={IconSize.SMALL}
            name="ArrowRightIcon"
            className={styles.icon}
          />
        }
        onClick={props.onCLick}
        className={styles.mainBlockButton}
      />
    </VerticalContainer>
  );
};
