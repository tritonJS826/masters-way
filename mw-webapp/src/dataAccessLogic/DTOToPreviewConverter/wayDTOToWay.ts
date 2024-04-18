import {SchemasWayPopulatedResponse} from "src/apiAutogenerated";
import {getWayStatus} from "src/logic/waysTable/wayStatus";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {Metric} from "src/model/businessModel/Metric";
import {Plan} from "src/model/businessModel/Plan";
import {Problem} from "src/model/businessModel/Problem";
import {Way} from "src/model/businessModel/Way";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import {Language} from "src/utils/LanguageWorker";

/**
 * Convert {@link SchemasWayPopulatedResponse} to {@link Way}
 */
export const wayDTOToWay = (wayDTO: SchemasWayPopulatedResponse): Way => {
  const status = getWayStatus({
    status: wayDTO.isCompleted ? "Completed" : null,
    lastUpdate: new Date(wayDTO.updatedAt),
    // TODO: need to fix it, it not always english
    language: Language.ENGLISH,
  });

  return new Way({
    ...wayDTO,
    metrics: wayDTO.metrics.map((metric) => {
      return new Metric({
        ...metric,
        doneDate: metric.doneDate ? new Date(metric.doneDate) : null,
      });
    }),
    status,
    favoriteForUsersAmount: wayDTO.favoriteForUsersAmount,
    mentors: arrayToHashMap({keyField: "uuid", list: wayDTO.mentors}),
    formerMentors: arrayToHashMap({keyField: "uuid", list: wayDTO.formerMentors}),
    dayReports: wayDTO.dayReports.map((dayReport) => {
      const createdAt = new Date(dayReport.createdAt);
      const updatedAt = new Date(dayReport.updatedAt);
      const jobsDone = dayReport.jobsDone.map((jobDone) => {
        const tags = jobDone.tags.map((tag) => {
          const jobTag: JobTag = {...tag};

          return jobTag;
        });

        return new JobDone({...jobDone, tags});
      });

      const plans = dayReport.plans.map((plan) => {

        const planUpdatedAt = new Date(plan.updatedAt);
        const planCreatedAt = new Date(plan.createdAt);

        return new Plan({
          ...plan,
          updatedAt: planUpdatedAt,
          createdAt: planCreatedAt,
          time: plan.time,
          description: plan.description,
        });
      });

      const problems = dayReport.problems.map((problem) => {
        return new Problem({
          ...problem,
          createdAt: new Date(problem.createdAt),
          updatedAt: new Date(problem.updatedAt),
        });
      });

      const comments = dayReport.comments.map((comment) => {
        return new Comment({
          ...comment,
          createdAt: new Date(comment.createdAt),
          updatedAt: new Date(comment.updatedAt),
        });
      });

      const report = new DayReport({
        ...dayReport,
        createdAt,
        updatedAt,
        jobsDone,
        plans,
        problems,
        comments,
      });

      return report;
    }),
    createdAt: new Date(wayDTO.createdAt),
    lastUpdate: new Date(wayDTO.updatedAt),
    children: wayDTO.children.map(wayDTOToWay),
  });
};
