import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

export default function MonthlyChart({ monthlyData }) {
  const labels = Object.keys(monthlyData)

  const data = {
    labels,
    datasets: [
      {
        label: 'Einnahmen',
        data: labels.map(m => monthlyData[m].income),
        backgroundColor: 'rgba(25, 135, 84, 0.7)'
      },
      {
        label: 'Ausgaben',
        data: labels.map(m => monthlyData[m].expense),
        backgroundColor: 'rgba(220, 53, 69, 0.7)'
      }
    ]
  }

  return <Bar data={data} />
}