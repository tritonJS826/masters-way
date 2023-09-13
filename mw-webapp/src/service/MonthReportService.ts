import {ref, get} from "firebase/database";
import {MonthReportDTOToMonthReportConverter} from "src/converter/MonthReportConverter";
import {db} from "src/firebase";
import {MonthReport} from "src/model/businessModel/MonthReport";
import {MonthReport as MonthReportDTO} from "src/model/firebaseCollection/MonthReport";

// TODO: use onValue method instead of get if it's possible (all services files)
// export class DayReportService {

//   public static onValueFromRealTimeDb(callBack: (data: DayReport[]) => void) {
//     onValue(ref(db, "/dayReports"), async (snapshot) => {
//       const dayReportsDTO: DayReportDTO[] = snapshot.val();
//       if (dayReportsDTO !== null) {
//         const dayReports = dayReportsDTO?.map((elem) => DayReportDTOToDayReportConverter(elem));
//         callBack(dayReports);
//       }
//     });
//   }

// }

export class MonthReportService {

  public static async getValueFromRealTimeDb(): Promise<MonthReport[]> {
    const snapshot = await get(ref(db, "/monthReports"));
    const monthReportsRaw: MonthReportDTO[] = await snapshot.val();
    const monthReports: MonthReport[] = monthReportsRaw.map((item) => MonthReportDTOToMonthReportConverter(item));
    return monthReports;
  }

}