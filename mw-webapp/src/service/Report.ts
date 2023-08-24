import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
import {Time} from "src/model/report/time/Time";
import {WorkDone} from "src/model/report/workDone/WorkDone";
// import {Unit} from "src/model/report/time/unit/Unit";
// import {ref, onValue} from "firebase/database";
// import {db} from "src/firebase";

// const fetchReports = async () => {
//   const todoList = await fetch("./todoList.json");
//   const reports = await todoList.json();
//   return reports;
// };

// let data: ReportDTO[];
// onValue(ref(db), snapshot => {
//   data = snapshot.val();
// });
// return data;

// let data: ReportDTO[];
// onValue(ref(db), snapshot => {
//   data = snapshot.val();
// });
// return data;

const reportDTOToBusinessConverter = (reportRaw: ReportDTO) => new Report({
  ...reportRaw,
  date: new Date(reportRaw.date),
  // eslint-disable-next-line max-len
  workDone: reportRaw.workDone?.map((workItem) =>
    new WorkDone(workItem.id, workItem.todoItem, new Time(workItem.time.unit, workItem.time.amount))),
  planForTomorrow: reportRaw.planForTomorrow?.map((planItem) =>
    new PlanForTomorrow(planItem.id, planItem.todoItem, new Time(planItem.time.unit, planItem.time.amount))),
});

export class ReportService {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async getAllReports(elem: any) {
  // public static async getAllReports() {
    // const reportsRaw: ReportDTO[] = await fetchReports();
    // const reports = reportsRaw.map(reportDTOToBusinessConverter);
    // return reports;
    const reports = await elem.map(reportDTOToBusinessConverter);
    return reports;
  }

}

