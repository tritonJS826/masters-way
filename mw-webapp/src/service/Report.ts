import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
import {Time} from "src/model/report/time/Time";
import {WorkDone} from "src/model/report/workDone/WorkDone";

const reportDTOToBusinessConverter = (reportRaw: ReportDTO) => new Report({
  ...reportRaw,
  date: new Date(reportRaw.date),
  workDone: reportRaw.workDone?.map((workItem) =>
    new WorkDone(workItem.id, workItem.todoItem, new Time(workItem.time.unit, workItem.time.amount))),
  planForTomorrow: reportRaw.planForTomorrow?.map((planItem) =>
    new PlanForTomorrow(planItem.id, planItem.todoItem, new Time(planItem.time.unit, planItem.time.amount))),
});

export class ReportService {

  public static async getAllReports(elem: ReportDTO[]) {
    const reportsDTO: ReportDTO[] = Object.values(elem);
    const reports = reportsDTO.map(reportDTOToBusinessConverter);
    return reports;
  }

}

