import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

/**
 * New day report props without uuid for {@link data} for possibility to auto-generate uuid on firestore
 */
export interface NewDayReportProps {
  /**
   * Report's date
   */
  date: string;
  /**
   * Array of @JobDone.uuid
   */
  jobsDone: string[];
  /**
   * Array of @PlanForNextPeriod.uuid
   */
  plansForNextPeriod: string[];
  /**
   * Array of @ProblemsForCurrent.uuid
   */
  problemsForCurrentPeriod: string[];
  /**
   * Student comments
   */
  studentComments: string[];
  /**
   * New knowledge that the user has received
   */
  learnedForToday: string[];
  /**
   * Array of @MentorComment.uuid
   */
  mentorComments: string[];
  /**
   * Return true if day is off and false if it is work day
   */
  isDayOff: boolean;
}

/**
 * Provides methods to interact with the DayReports collection in Firestore.
 */
export class DayReportService {

  /**
   * Read DayReports collection
   * @returns {Promise<DayReportDTO[]>} promise of DayReportsDTO[]
   */
  public static async getDayReportsDTO(): Promise<DayReportDTO[]> {
    const dayReportsRaw = await getDocs(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReports: DayReportDTO[] = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);

    return dayReports;
  }

  /**
   * Read DayReport by Uuid
   * @returns {Promise<DayReportDTO>} promise of DayReportsDTO
   */
  public static async getDayReportDTO(uuid: string): Promise<DayReportDTO> {
    const dayReportRaw = await getDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid));
    const dayReport: DayReportDTO = documentSnapshotToDTOConverter<DayReportDTO>(dayReportRaw);

    return dayReport;
  }

  /**
   * Create new day report
   */
  public static async createDayReportDTO(data: NewDayReportProps) {
    const docRef = doc(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const DEFAULT_DAY_REPORT: DayReportDTO = {
      ...data,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_DAY_REPORT);
  }

  /**
   * Update day report
   * @param {DayReportDTO} data DayReportDTO
   */
  public static async updateDayReportDTO(data: DayReportDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid), {...data});
  }

}
