import {observer} from "mobx-react-lite";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {CommentCard} from "src/component/reportCard/commentCard/CommentCard";
import {JobsDoneCard} from "src/component/reportCard/jobCard/JobCard";
import {PlanCard} from "src/component/reportCard/planCard/PlanCard";
import {ProblemCard} from "src/component/reportCard/problemCard/ProblemCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {userStore} from "src/globalStore/UserStore";
import {DayReport} from "src/model/businessModel/DayReport";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {WayWithoutDayReports} from "src/model/businessModelPreview/WayWithoutDayReports";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import {ArrayUtils} from "src/utils/ArrayUtils";
import {DateUtils} from "src/utils/DateUtils";
import {TreeUtils} from "src/utils/TreeUtils";
import styles from "src/component/reportCard/ReportCard.module.scss";

/**
 * ReportCard props
 */
interface ReportCardProps {

  /**
   * Way
   */
  way: Way;

  /**
   * Day report
   */
  dayReport: DayReport;

  /**
   * Callback triggered to update way statistics triple
   */
  setWayStatisticsTriple: (wayStatisticsTriple: WayStatisticsTriple) => void;

  /**
   * Way's participants
   */
  wayParticipantsMap: Map<string, UserPlain>;

  /**
   * Create new day report
   */
  createDayReport: (wayUuid: string, dayReportUuids: DayReport[]) => Promise<DayReport>;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

}

/**
 * ReportCard component
 */
export const ReportCard = observer((props: ReportCardProps) => {
  const {user} = userStore;
  const ownerUuid = props.way.owner.uuid;
  const isOwner = user?.uuid === ownerUuid;
  const isMentor = !!user && !!user.uuid && props.way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;
  const isWayComposite = props.way.children.length !== 0;

  const participantsSafeMap = new SafeMap(props.wayParticipantsMap);

  const allParticipants: WayWithoutDayReports[] = [];
  TreeUtils.forEach(props.way, (node) => {
    allParticipants.push(node);
  });
  const waysMapRaw =
    arrayToHashMap({keyField: "uuid", list: allParticipants});
  const waysSafeMap = new SafeMap(waysMapRaw);

  return (
    <VerticalContainer
      className={styles.reportCard}
      dataCy={props.dataCy}
    >
      <div>
        {DateUtils.getShortISODateValue(props.dayReport.createdAt)}
      </div>
      <HorizontalGridContainer className={styles.reportItemWrapper}>
        <JobsDoneCard
          user={user}
          dayReport={props.dayReport}
          isEditable={isUserOwnerOrMentor}
          waysMap={waysSafeMap}
          labels={ArrayUtils.removeDuplicatesByField(
            TreeUtils.flattenTree(props.way).flatMap(node => node.jobTags),
            "uuid",
          )}
          wayUuid={props.way.uuid}
          wayName={props.way.name}
          setWayStatisticsTriple={props.setWayStatisticsTriple}
          isWayComposite={isWayComposite}
          wayParticipantsMap={participantsSafeMap}
        />
        <CommentCard
          dayReport={props.dayReport}
          isEditable={isUserOwnerOrMentor}
          way={props.way}
          user={user}
          wayParticipantsMap={participantsSafeMap}
        />
        <PlanCard
          dayReport={props.dayReport}
          isEditable={isUserOwnerOrMentor}
          labels={ArrayUtils.removeDuplicatesByField(
            TreeUtils.flattenTree(props.way).flatMap(node => node.jobTags),
            "uuid",
          )}
          waysMap={waysSafeMap}
          way={props.way}
          createDayReport={props.createDayReport}
          user={user}
          wayParticipantsMap={participantsSafeMap}
        />
        <ProblemCard
          dayReport={props.dayReport}
          isEditable={isUserOwnerOrMentor}
          way={props.way}
          user={user}
          wayParticipantsMap={participantsSafeMap}
        />
      </HorizontalGridContainer>
    </VerticalContainer>
  );
});
