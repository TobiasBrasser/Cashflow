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
  const [budget, setBudget] = useState(0)

  useEffect(() => {
    const loadData = () => {
      const storedTransactions =
        JSON.parse(localStorage.getItem('cashflowr-transactions')) || []
      setTransactions(storedTransactions)

      const storedBudget = localStorage.getItem('cashflowr-budget')
      if (storedBudget) setBudget(Number(storedBudget))
    }

    loadData()
    window.addEventListener('storage', loadData)
    return () => window.removeEventListener('storage', loadData)
  }, [])

  const handleBudgetChange = (value) => {
    const numericValue = Number(value)
    setBudget(numericValue)
    localStorage.setItem('cashflowr-budget', numericValue)
  }

  const monthlyOverview = transactions.reduce((acc, t) => {
    const month = getMonthKey(t.date)
    if (!acc[month]) acc[month] = { income: 0, expense: 0 }

    if (t.type === 'income') acc[month].income += t.amount
    else acc[month].expense += t.amount

    return acc
  }, {})

  const currentMonthKey = getMonthKey(new Date())
  const currentMonthData = monthlyOverview[currentMonthKey]

  return (
    <>
      <h1>Monatsübersicht</h1>
      <p className="text-muted">
        Behalte deine Einnahmen und Ausgaben im Überblick.
      </p>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Monatliches Budget</h5>
          <div className="row align-items-center">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Budget in CHF"
                value={budget || ''}
                onChange={(e) => handleBudgetChange(e.target.value)}
              />
            </div>

            {currentMonthData && budget > 0 && (
              <div className="col-md-8 mt-3 mt-md-0">
                <strong>Einnahmen:</strong>{' '}
                <span className="text-success">
                  {currentMonthData.income.toFixed(2)} CHF
                </span>{' '}
                | <strong>Ausgaben:</strong>{' '}
                <span className="text-danger">
                  {currentMonthData.expense.toFixed(2)} CHF
                </span>{' '}
                | <strong>Verbleibend:</strong>{' '}
                <span
                  className={
                    budget - currentMonthData.expense >= 0
                      ? 'text-success'
                      : 'text-danger'
                  }
                >
                  {(budget - currentMonthData.expense).toFixed(2)} CHF
                </span>
              </div>
            )}
          </div>

          {currentMonthData &&
            budget > 0 &&
            currentMonthData.expense > budget && (
              <div className="alert alert-danger mt-3">
                ⚠️ Budget für diesen Monat überschritten!
              </div>
            )}
        </div>
      </div>

      <div className="horizontal-scroll">
      <table className="table table-striped responsive-table">
        <thead>
          <tr>
            <th>Monat</th>
            <th>Einnahmen (CHF)</th>
            <th>Ausgaben (CHF)</th>
            <th>Saldo (CHF)</th>
            <th className="col-secondary">Budgetstatus</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(monthlyOverview).map(([month, data]) => {
            const saldo = data.income - data.expense
            const remaining = budget - data.expense
            const isOverBudget = budget > 0 && remaining < 0

            return (
              <tr key={month}>
                <td>{formatMonth(month)}</td>
                <td className="text-success">+ {data.income.toFixed(2)}</td>
                <td className="text-danger">- {data.expense.toFixed(2)}</td>
                <td className={saldo >= 0 ? 'text-success' : 'text-danger'}>
                  {saldo.toFixed(2)}
                </td>
                <td className="col-secondary">
                  {budget > 0 ? (
                    <span
                      className={`badge ${
                        isOverBudget ? 'bg-danger' : 'bg-success'
                      }`}
                    >
                      {isOverBudget
                        ? `❌ Überschritten (-${Math.abs(remaining).toFixed(
                            2
                          )} CHF)`
                        : `✅ OK (+${remaining.toFixed(2)} CHF)`}
                    </span>
                  ) : (
                    <span className="text-muted">–</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
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
