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

const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export default function MonthlyChart({ monthlyData }) {
  const labels = Object.keys(monthlyData)
  if (labels.length === 0) return null

  const textColor = getCSSVar('--text-color')
  const borderColor = getCSSVar('--border-color')

  const data = {
    labels,
    datasets: [
      {
        label: 'Einnahmen',
        data: labels.map(m => monthlyData[m].income),
        backgroundColor: 'rgba(25, 135, 84, 0.75)'
      },
      {
        label: 'Ausgaben',
        data: labels.map(m => monthlyData[m].expense),
        backgroundColor: 'rgba(220, 53, 69, 0.75)'
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: borderColor }
      },
      y: {
        ticks: { color: textColor },
        grid: { color: borderColor }
      }
    }
  }

  return <Bar data={data} options={options} />
}
