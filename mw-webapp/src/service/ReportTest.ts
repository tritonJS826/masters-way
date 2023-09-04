// import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
// import {WorkDone} from "src/model/report/workDone/WorkDone";
// import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
// import {Time} from "src/model/report/time/Time";
// import {Unit} from "src/model/report/time/unit/Unit";
import {ref, onValue, update, push, child} from "firebase/database";
import {db} from "src/firebase";
// import {currentDate} from "src/utils/getDate";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";
import {DayReport} from "src/model/businessModel/DayReport";
// import {CurrentProblem} from "src/model/firebaseCollection/CurrentProblem";
// import {JobDone} from "src/model/businessModel/JobDone";
// import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
// import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
// import {Time} from "src/model/businessModel/time/Time";
// import {Unit} from "src/model/report/time/unit/Unit";

const reportDTOToBusinessConverter = (reportRaw: DayReportDTO) => new DayReport({
  ...reportRaw,
  date: new Date(reportRaw.date),
  // jobsDone: reportRaw.jobsDone.map((item) => new JobDone(item, "desc", new Time(Unit.MINUTE, 30))),
  // plansForNextPeriod: reportRaw.plansForNextPeriod.map((item) => new PlanForNextPeriod(item)),
  // // eslint-disable-next-line max-len
  // problemsForCurrentPeriod: reportRaw.problemsForCurrentPeriod.map((item) => new CurrentProblem(item)),
});

export class ReportService {

  // public static async getAllReports(elem: ReportDTO[]) {
  //   const reportsDTO: ReportDTO[] = Object.values(elem);
  //   const reports = reportsDTO.map(reportDTOToBusinessConverter);
  //   return reports;
  // }

  public static onValueFromRealTimeDb(callBack: (data: DayReport[]) => void) {
    onValue(ref(db, "/dayReports"), async (snapshot) => {
      const reportsRaw: DayReportDTO[] = snapshot.val();
      console.log(snapshot.val());
      if (reportsRaw !== null) {
        console.log(2);
        const reportsDTO: DayReportDTO[] = Object.values(reportsRaw);
        console.log(reportsDTO);
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
    return update(ref(db, "/" + newPostKey), {id: newPostKey, date: "2023-01-09"});
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

