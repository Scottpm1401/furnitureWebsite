import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { CHART_COLORS, CHART_COLORS_HOVER } from '../../../constant';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string[];
  data: number[];
};

const TopUsersDoughnutChart = ({ title, data }: Props) => {
  const chartData: ChartData<'doughnut', number[], string> = {
    labels: title,
    datasets: [
      {
        data: data,
        backgroundColor: CHART_COLORS,
        borderColor: CHART_COLORS_HOVER,
        hoverBackgroundColor: CHART_COLORS_HOVER,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default TopUsersDoughnutChart;
