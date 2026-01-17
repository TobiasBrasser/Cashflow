import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ExpenseCategoryChart({ expenses }) {
  const categories = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories), 
        backgroundColor: [
          '#dc3545',
          '#ffc107',
          '#0d6efd',
          '#198754',
          '#6f42c1',
          '#adb5bd'
        ]
      }
    ]
  }

  return <Pie data={data} />
}