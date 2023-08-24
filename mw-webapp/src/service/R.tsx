import {ref, onValue} from "firebase/database";
import {useState, useEffect} from "react";
import {db} from "src/firebase";
import {ReportDTO} from "src/model/report/ReportDTO";
import {ReportService} from "src/service/Report";

export const R = () => {
  const [reports, setReports] = useState([]);

  const getReports = async (elem: ReportDTO[]) => {
    const reportsData = await ReportService.getAllReports(elem);
    const reportsArray = reportsData.reverse();
    setReports(reportsArray);
  };

  const getData = () => {
    onValue(ref(db), async snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        getReports(data);
      }
    });
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {reports.map(report => (
        <h5 key={report.id}>
          {report.id}
        </h5>
      ))}
    </div>
  );
};
