import {ref, onValue} from "firebase/database";
import {db} from "src/firebase";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

export class DayReportService {

  public static onValueFromRealTimeDb(callBack: (data: DayReportDTO[]) => void) {
    onValue(ref(db, "/dayReports"), async (snapshot) => {
      const dayReports: DayReportDTO[] = snapshot.val();
      if (dayReports !== null) {
        callBack(dayReports);
      }
    });
  }

}