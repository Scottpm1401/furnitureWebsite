import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { CHART_COLORS, CHART_COLORS_HOVER } from '../../../constant';
import { BoughtProduct } from '../../../models/analysis';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  boughtProducts: BoughtProduct[];
};

const ProductsPieChart = ({ boughtProducts }: Props) => {
  const chartData: ChartData<'pie', number[], string> = {
    labels: boughtProducts.map((product) => product.title),
    datasets: [
      {
        data: boughtProducts.map((product) => product.num_of_purchase),
        backgroundColor: CHART_COLORS,
        borderColor: CHART_COLORS_HOVER,
        hoverBackgroundColor: CHART_COLORS_HOVER,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default ProductsPieChart;
