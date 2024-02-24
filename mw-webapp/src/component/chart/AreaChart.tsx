import {Line} from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {DateUtils} from "src/utils/DateUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const options = {
  responsive: true,
  plugins: {},
};

/**
 * Chart props
 */
interface AreaChartProps {

  /**
   * Start date
   */
  startDate: Date;

  /**
   * Last date
   */
  lastDate: Date;

  /**
   * All dates in the way with JobTotalTime
   * @key date
   * @value job done total time per day
   */
  datesWithJobTotalTime: Map<string, number>;

}

/**
 * Chart component
 */
export const AreaChart = (props: AreaChartProps) => {
  const dateList = DateUtils.getDatesBetween(props.startDate, props.lastDate);
  const labels = dateList.map((item) => DateUtils.getShortISODateValue(item));

  const dateWithJobTotalTime: Map<string, number> = new Map(labels.map((date) => {
    const jobDoneTotal = props.datesWithJobTotalTime.get(date) ?? 0;

    return [date, jobDoneTotal];
  }));

  const dataJob = Array.from(dateWithJobTotalTime.values());

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        lineTension: 0.4,
        label: "Total time",
        data: dataJob,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Line
      options={options}
      data={data}
    />
  );
};
