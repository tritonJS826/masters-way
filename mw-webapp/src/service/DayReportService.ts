import {ref, get} from "firebase/database";
import {DayReportDTOToDayReportConverter} from "src/converter/DayReportConverter";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

export class DayReportService {

  // TODO: use onValue method instead of get if it's possible (all services files)
  // public static onValueFromRealTimeDb(callBack: (data: DayReport[]) => void) {
  //   onValue(ref(db, "/dayReports"), async (snapshot) => {
  //     const dayReportsDTO: DayReportDTO[] = snapshot.val();
  //     if (dayReportsDTO !== null) {
  //       const dayReports = dayReportsDTO.map((elem) => DayReportDTOToDayReportConverter(elem));
  //       callBack(dayReports);
  //     }
  //   });
  // }

  public static async getValueFromRealTimeDb(): Promise<DayReport[]> {
    const snapshot = await get(ref(db, "/dayReports"));
    const dayReportsRaw: DayReportDTO[] = await snapshot.val();
    const dayReports: DayReport[] = dayReportsRaw.map((item) => DayReportDTOToDayReportConverter(item));
    return dayReports;

  }

}