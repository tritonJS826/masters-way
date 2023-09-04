import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
import {WorkDone} from "src/model/report/workDone/WorkDone";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Time} from "src/model/report/time/Time";
import {Unit} from "src/model/report/time/unit/Unit";
import {ref, onValue, update, push, child} from "firebase/database";
import {db} from "src/firebase";
import {currentDate} from "src/utils/DateValue";

const reportDTOToBusinessConverter = (reportRaw: ReportDTO) => new Report({
  ...reportRaw,
  date: new Date(reportRaw.date),
  workDone: reportRaw.workDone?.map((workItem) =>
    new WorkDone(workItem.id, workItem.todoItem, new Time(Unit[workItem.time.unit], workItem.time.amount))),
  planForTomorrow: reportRaw.planForTomorrow?.map((planItem) =>
    new PlanForTomorrow(planItem.id, planItem.todoItem, new Time(Unit[planItem.time.unit], planItem.time.amount))),
});

export class ReportService {

  // public static async getAllReports(elem: ReportDTO[]) {
  //   const reportsDTO: ReportDTO[] = Object.values(elem);
  //   const reports = reportsDTO.map(reportDTOToBusinessConverter);
  //   return reports;
  // }

  public static onValueFromRealTimeDb(callBack: (data: Report[]) => void) {
    onValue(ref(db), async (snapshot) => {
      const reportsRaw: ReportDTO[] = snapshot.val();
      if (reportsRaw !== null) {
        const reportsDTO: ReportDTO[] = Object.values(reportsRaw);
        const reports = reportsDTO.map(reportDTOToBusinessConverter);
        const reportsArray = reports.reverse();
        callBack(reportsArray);
      }
    });
  }

  public static writeNewReportToRealTimeDb() {


    // Get a key for a new Post. Generate a random key
    const newPostKey: string = push(child(ref(db), "/")).key!;

    // A post entry. Empty table raw
    const postData = <ReportDTO>{};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: { [key: string]: any } = {};
    updates["/" + newPostKey] = postData;

    // return update(ref(db), updates);
    return update(ref(db, "/" + newPostKey), {id: newPostKey, date: currentDate});
  }

  public static updateReportToRealTimeDb(uuid: string) {

    // A post entry.
    const postData = {mentorComment: ["aaa"]};

    // Get a key for a new Post. Generate a random key
    // const newPostKey = push(child(ref(db), "/")).key;

    const postKey = uuid;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: { [key: string]: any } = {};
    updates["/" + postKey] = postData;

    // return update(ref(db), updates);

    return update(ref(db, "/" + postKey), {mentorComment: ["New title!!!!"]});
  }

}

