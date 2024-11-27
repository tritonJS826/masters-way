import {observer} from "mobx-react-lite";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {ReportItemCard} from "src/component/reportItemCard/ReportItemCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {CommentReportList} from "src/logic/wayPage/reports/dayReports/reportItem/commentReportList/CommentReportList";
import {JobsReportList} from "src/logic/wayPage/reports/dayReports/reportItem/jobsReportList/JobsReportList";
import {PlanReportList} from "src/logic/wayPage/reports/dayReports/reportItem/planReportList/PlansReportList";
import {ProblemReportList} from "src/logic/wayPage/reports/dayReports/reportItem/problemReportList/ProblemReportList";
import {DayReport} from "src/model/businessModel/DayReport";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {WayWithoutDayReports} from "src/model/businessModelPreview/WayWithoutDayReports";
import {LanguageService} from "src/service/LanguageService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import {ArrayUtils} from "src/utils/ArrayUtils";
import {DateUtils} from "src/utils/DateUtils";
import {TreeUtils} from "src/utils/TreeUtils";
import styles from "src/logic/wayPage/reports/dayReports/reportCard/ReportCard.module.scss";

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
  const {language} = languageStore;
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
        <ReportItemCard
          title={LanguageService.way.reportsTable.column.jobsDone[language]}
          infotipText={LanguageService.way.infotip.jobs[language]}
        >
          <JobsReportList
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
        </ReportItemCard>
        <ReportItemCard
          title={LanguageService.way.reportsTable.column.plans[language]}
          infotipText={LanguageService.way.infotip.plans[language]}
        >
          <PlanReportList
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
        </ReportItemCard>
        <ReportItemCard
          title={LanguageService.way.reportsTable.column.problems[language]}
          infotipText={LanguageService.way.infotip.problems[language]}
        >
          <ProblemReportList
            dayReport={props.dayReport}
            isEditable={isUserOwnerOrMentor}
            way={props.way}
            user={user}
            wayParticipantsMap={participantsSafeMap}
          />
        </ReportItemCard>
        <ReportItemCard
          title={LanguageService.way.reportsTable.column.comments[language]}
          infotipText={LanguageService.way.infotip.comments[language]}
        >
          <CommentReportList
            dayReport={props.dayReport}
            isEditable={isUserOwnerOrMentor}
            way={props.way}
            user={user}
            wayParticipantsMap={participantsSafeMap}
          />
        </ReportItemCard>
      </HorizontalGridContainer>
    </VerticalContainer>
  );
});
