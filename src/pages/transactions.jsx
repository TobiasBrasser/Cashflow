import { useEffect, useState } from 'react'
import CreateTransactionModal from '../components/CreateTransactionModal'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem('cashflowr-transactions')) || []
    setTransactions(stored)
  }, [])

  const saveTransaction = (data) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      ...data,
      date: new Date().toISOString()
    }

    const updated = [...transactions, newTransaction]

    setTransactions(updated)
    localStorage.setItem(
      'cashflowr-transactions',
      JSON.stringify(updated)
    )
  }

  const incomes = transactions.filter(t => t.type === 'income')
  const expenses = transactions.filter(t => t.type === 'expense')

  return (
    <>
      <h1>Übersicht</h1>

      <CreateTransactionModal onSave={saveTransaction} />

      {/* Einnahmen */}
      <h3>Einnahmen</h3>
      <table className="table table-striped mb-5">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beschreibung</th>
            <th>Betrag (CHF)</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td className="text-success">
                + {t.amount.toFixed(2)}
              </td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Ausgaben</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beschreibung</th>
            <th>Betrag (CHF)</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td className="text-danger">
                - {t.amount.toFixed(2)}
              </td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
