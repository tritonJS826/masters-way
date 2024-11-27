import {PropsWithChildren} from "react";
import {observer} from "mobx-react-lite";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
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

  /**
   * Infotip text
   */
  infotipText: string;

}

/**
 * ReportItemCard component
 */
export const ReportItemCard = observer((props: PropsWithChildren<ReportItemCardProps>) => {
  return (
    <VerticalContainer className={styles.wrap}>
      <HorizontalContainer>
        <Infotip content={props.infotipText} />
        <Title
          level={HeadingLevel.h3}
          placeholder=""
          text={props.title}
        />
      </HorizontalContainer>
      <VerticalContainer className={styles.list}>
        {props.children}
      </VerticalContainer>
    </VerticalContainer>
  );
});
