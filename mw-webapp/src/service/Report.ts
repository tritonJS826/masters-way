import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
// import {Time} from "src/model/report/time/Time";
// import {Unit} from "src/model/report/time/unit/Unit";
import {WorkDone} from "src/model/report/workDone/WorkDone";
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

const reportDTOToBusinessConverter = (reportRaw: ReportDTO) => new Report({
  ...reportRaw,
  date: new Date(reportRaw.date),
  workDone: reportRaw.workDone.map((workItem) => new WorkDone(workItem.id, workItem.todoItem, workItem.time)),
  planForTomorrow: reportRaw.planForTomorrow.map((planItem) =>
    new PlanForTomorrow(planItem.id, planItem.todoItem, planItem.time)),
});

export class ReportService {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async getAllReports(elem: any) {
    // const reportsRaw: ReportDTO[] = await fetchReports();
    // const reports = reportsRaw.map(reportDTOToBusinessConverter);
    // return reports;
    const reports = elem.map(reportDTOToBusinessConverter);
    return reports;

    // onValue(ref(db), snapshot => {
    //   const data: ReportDTO = snapshot.val();
    //   const reports = Object.values(data).map(reportDTOToBusinessConverter);
    //   return reports;
    // });
  }

}

