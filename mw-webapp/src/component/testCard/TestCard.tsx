import {observer} from "mobx-react-lite";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/testCard/TestCard.module.scss";

/**
 * Test card props
 */
interface TestCardProps {

  /**
   * Test preview
   */
  testPreview: TestPreview;

  /**
   * Created at tooltip
   */
  createdAtTooltip: string;

  /**
   * Updated at tooltip
   */
  updatedAtTooltip: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * TestCard component
 */
export const TestCard = observer((props: TestCardProps) => {

  return (
    <Link
      path={pages.lobbyTest.getPath({uuid: props.testPreview.uuid})}
      className={styles.cardLink}
      dataCy={props.dataCy}
    >
      <VerticalContainer className={styles.testCardContainer}>
        <VerticalContainer className={styles.mainInfo}>
          <HorizontalContainer className={styles.nameLikes}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.testPreview.name}
            >
              <Title
                text={props.testPreview.name}
                level={HeadingLevel.h3}
                className={styles.title}
                placeholder=""
              />
            </Tooltip>
          </HorizontalContainer>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={renderMarkdown(props.testPreview.description)}
          >
            <span className={styles.testDescription}>
              {renderMarkdown(props.testPreview.description)}
            </span>
          </Tooltip>
        </VerticalContainer>
        <VerticalContainer className={styles.additionalInfo}>
          <HorizontalContainer className={styles.dates}>
            <HorizontalContainer className={styles.dateText}>
              {props.createdAtTooltip}
              <span className={styles.dateValue}>
                {DateUtils.getShortISODotSplitted(props.testPreview.createdAt)}
              </span>
            </HorizontalContainer>
            <HorizontalContainer className={styles.dateText}>
              {props.updatedAtTooltip}
              <span className={styles.dateValue}>
                {DateUtils.getShortISODotSplitted(props.testPreview.updatedAt)}
              </span>
            </HorizontalContainer>
          </HorizontalContainer>
          <HorizontalContainer className={styles.people}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.testPreview.ownerUuid}
            >
              <HorizontalContainer className={styles.owner}>
                {/* <Avatar
                  alt={props.testPreview.owner.name}
                  src={props.testPreview.owner.imageUrl}
                  className={styles.avatar}
                /> */}
                <Text text={props.testPreview.ownerUuid} />
              </HorizontalContainer>
            </Tooltip>
          </HorizontalContainer>
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
});
