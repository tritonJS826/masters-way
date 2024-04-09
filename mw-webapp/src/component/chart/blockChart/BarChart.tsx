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
import {ItemStat} from "src/component/chart/ItemStat";
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
  itemStats: ItemStat[];

}

/**
 * Pie chart component (Similar radar chart)
 */
export const BarChart = (props: BarChartProps) => {
  const dataSet = props.itemStats.map((itemStat) => {
    return {
      label: itemStat.name,
      data: [itemStat.value],
      borderColor: itemStat.color,
      backgroundColor: itemStat.color,
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
        barPercentage: 1,
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
};
