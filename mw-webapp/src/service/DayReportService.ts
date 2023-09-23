import {onValue, ref} from "firebase/database";
// Import withLoading from "src/component/inProgress/loading";
import {DayReportDTOToDayReportConverter} from "src/converter/DayReportConverter";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

export class DayReportService {

  // @withLoading()
  public static onValueFromRealTimeDb(callBack: (data: DayReport[]) => void) {
    onValue(ref(db, "/dayReports"), async (snapshot) => {
      const dayReportsDTO: DayReportDTO[] = snapshot.val();
      if (dayReportsDTO !== null) {
        const dayReports = dayReportsDTO?.map((elem) => DayReportDTOToDayReportConverter(elem));
        callBack(dayReports);
      }
    });
  }

}