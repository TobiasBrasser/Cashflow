import { useEffect, useState } from 'react'

const getMonthKey = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

const formatMonth = (key) => {
  const [year, month] = key.split('-')
  return new Date(year, month - 1).toLocaleDateString('de-CH', {
    month: 'long',
    year: 'numeric'
  })
}

export default function Home() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem('cashflowr-transactions')) || []
    setTransactions(stored)
  }, [])

  const monthlyOverview = transactions.reduce((acc, t) => {
    const month = getMonthKey(t.date)

    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 }
    }

    if (t.type === 'income') {
      acc[month].income += t.amount
    } else {
      acc[month].expense += t.amount
    }

    return acc
  }, {})

  return (
    <>
      <h1>Monatsübersicht</h1>
      <p className="text-muted">
        Behalte deine Einnahmen und Ausgaben im Überblick.
      </p>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Monat</th>
            <th>Einnahmen (CHF)</th>
            <th>Ausgaben (CHF)</th>
            <th>Saldo (CHF)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(monthlyOverview).map(([month, data]) => {
            const saldo = data.income - data.expense

            return (
              <tr key={month}>
                <td>{formatMonth(month)}</td>
                <td className="text-success">
                  + {data.income.toFixed(2)}
                </td>
                <td className="text-danger">
                  - {data.expense.toFixed(2)}
                </td>
                <td className={saldo >= 0 ? 'text-success' : 'text-danger'}>
                  {saldo.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="alert alert-info">
        Diagramme und Zusammenfassungen folgen hier.
      </div>
      {transactions.length === 0 && (
        <div className="alert alert-info mt-4">
          Noch keine Transaktionen vorhanden.
        </div>
      )}
    </>
  )
}
