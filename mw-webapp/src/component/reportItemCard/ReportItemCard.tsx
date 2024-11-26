import {PropsWithChildren} from "react";
import {observer} from "mobx-react-lite";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/reportItemCard/ReportItemCard.module.scss";

/**
 * ReportItemCard props
 */
interface ReportItemCardProps {

  /**
   * Report item card's title
   */
  title: string;

}

/**
 * ReportItemCard component
 */
export const ReportItemCard = observer((props: PropsWithChildren<ReportItemCardProps>) => {
  return (
    <VerticalContainer className={styles.wrap}>
      <Title
        level={HeadingLevel.h3}
        placeholder=""
        text={props.title}
      />
      <VerticalContainer className={styles.list}>
        {props.children}
      </VerticalContainer>
    </VerticalContainer>
  );
});
