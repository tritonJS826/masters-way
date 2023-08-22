import {ref, onValue} from "firebase/database";
import {useState, useEffect} from "react";
import {db} from "src/firebase";
import {ReportService} from "src/service/Report";

export const R = () => {
  const [datas, setDatas] = useState([]);
  const [reports, setReports] = useState([]);


  const getData = () => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        setDatas(Object.values(data));
      }
    });
  };

  const getReports = async (elems) => {
    const reportsData = await ReportService.getAllReports(elems);
    setReports(reportsData.reverse());
    return reports;
  };


  useEffect(() => {
    getData();
    getReports(datas);
  }, []);

  return (
    <div>
      {datas.map(report => (
        <h5 key={report.id}>
          {report.mentorComment}
        </h5>
      ))}
    </div>
  );
};
