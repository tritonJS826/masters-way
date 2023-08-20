import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
import {WorkDone} from "src/model/report/workDone/WorkDone";

const fetchReports = async () => {
  const todoList = await fetch("./todoList.json");
  const reports = await todoList.json();
  return reports;
};

const reportDTOToBusinessConverter = (reportRaw: ReportDTO) => new Report({
  ...reportRaw,
  date: new Date(reportRaw.date),
  workDone: reportRaw.workDone.map((workItem) => new WorkDone(workItem.id, workItem.todoItem, workItem.time)),
});

export class ReportService {

  public static async getAllReports() {
    const reportsRaw: ReportDTO[] = await fetchReports();
    const reports = reportsRaw.map(reportDTOToBusinessConverter);
    return reports;
  }

}

