import {Bar} from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import {observer} from "mobx-react-lite";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {Label} from "src/model/businessModel/Label";
import styles from "src/component/chart/blockChart/BarChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * Chart props
 */
interface BarChartProps {

  /**
   * Label inside section description
   */
  label: string;

  /**
   * All items data
   */
  itemStats: JobTagStat[];

  /**
   * All labels
   */
  labels: Label[];

}

/**
 * Pie chart component (Similar radar chart)
 */
export const BarChart = observer((props: BarChartProps) => {

  const dataSet = props.itemStats.map((itemStat) => {
    return {
      label: itemStat.jobTag.name,
      data: [itemStat.totalTime],
      borderColor: props.labels.find(label => label.uuid === itemStat.jobTag.uuid)?.color ?? itemStat.jobTag.color,
      backgroundColor: props.labels.find(label => label.uuid === itemStat.jobTag.uuid)?.color ?? itemStat.jobTag.color,
    };
  });

  const data = {
    labels: [""],
    datasets: dataSet,
  };

  const options = {
    indexAxis: "y" as const,
    scales: {
      x: {
        min: 0,
        max: dataSet.reduce((accum, item) => (accum + item.data[0]), 0),
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        position: "left" as const,
        display: false,
      },
      title: {
        padding: 1,
        display: true,
        text: "",
      },
    },
  };

  return (
    <div className={styles.barChartContainer}>
      <Bar
        className={styles.barChart}
        options={options}
        data={data}
      />
    </div>
  );
});
