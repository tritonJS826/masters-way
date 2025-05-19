import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ProblemItem, ProblemItemProps} from "src/logic/staticPages/landingPages/problemItem/ProblemItem";
import styles from "src/logic/staticPages/landingPages/problemsBlock/ProblemsBlock.module.scss";

/**
 * Problems block props
 */
interface ProblemsBlockProps {

  /**
   * Title
   */
  title: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Problems items
   */
  problemItems: ProblemItemProps[];

}

/**
 * Problems block widget
 */
export const ProblemsBlock = (props: ProblemsBlockProps) => {
  return (
    <VerticalContainer className={styles.problemsBlock}>
      <Title
        classNameHeading={styles.title}
        level={HeadingLevel.h2}
        text={props.title}
        placeholder=""
      />

      <p className={styles.titleDescription}>
        {props.description}
      </p>
      <HorizontalContainer className={styles.advantages}>
        {props.problemItems.map((problemItem) => (
          <ProblemItem
            key={problemItem.title}
            title={problemItem.title}
            description={problemItem.description}
            imageSrc={problemItem.imageSrc}
            isReversed={problemItem.isReversed}
            buttonValue={problemItem.buttonValue}
            onClick={problemItem.onClick}
          />
        ))}
      </HorizontalContainer>
    </VerticalContainer>
  );
};
