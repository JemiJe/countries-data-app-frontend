import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CountryPopulationData } from '@/types/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PopulationChart = ({populationDataArray}: { populationDataArray: CountryPopulationData } ) => {
  const chartData = {
    labels: populationDataArray.populationCounts.map(( { year } ) => year),
    datasets: [
      {
        label: 'Population',
        data: populationDataArray.populationCounts.map(( { value } ) => value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Box>
      <Line data={chartData} />
    </Box>
  );
};

export default PopulationChart;
