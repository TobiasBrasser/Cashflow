import { useEffect, useState } from 'react'
import CreateTransactionModal from '../components/CreateTransactionModal'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [editTransaction, setEditTransaction] = useState(null) // für Bearbeiten

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem('cashflowr-transactions')) || []
    setTransactions(stored)
  }, [])

  const saveTransaction = (data, id = null) => {
    let updated
    if (id) {
      // Update
      updated = transactions.map(t =>
        t.id === id ? { ...t, ...data, date: new Date().toISOString() } : t
      )
    } else {
      // Neue Transaktion
      const newTransaction = {
        id: crypto.randomUUID(),
        ...data,
        date: new Date().toISOString()
      }
      updated = [...transactions, newTransaction]
    }

    setTransactions(updated)
    localStorage.setItem(
      'cashflowr-transactions',
      JSON.stringify(updated)
    )
  }

  const deleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id)
    setTransactions(updated)
    localStorage.setItem('cashflowr-transactions', JSON.stringify(updated))
  }

  const incomes = transactions.filter(t => t.type === 'income')
  const expenses = transactions.filter(t => t.type === 'expense')

  return (
    <>
      <h1>Übersicht</h1>

      {/* Create + Edit Modal */}
      <CreateTransactionModal
        key={editTransaction ? editTransaction.id : 'new'}
        onSave={(data) => saveTransaction(data, editTransaction?.id)}
        editData={editTransaction}
        onClose={() => setEditTransaction(null)}
      />

      {/* Einnahmen */}
      <h3>Einnahmen</h3>
      <table className="table table-striped mb-5">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Kategorie</th>
            <th>Beschreibung</th>
            <th>Betrag (CHF)</th>
            <th>Datum</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category || '-'}</td>
              <td>{t.description}</td>
              <td className="text-success">+ {t.amount.toFixed(2)}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>
                <IconButton
                  color="primary"
                  onClick={() => setEditTransaction(t)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteTransaction(t.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ausgaben */}
      <h3>Ausgaben</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Kategorie</th>
            <th>Beschreibung</th>
            <th>Betrag (CHF)</th>
            <th>Datum</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category || '-'}</td>
              <td>{t.description}</td>
              <td className="text-danger">- {t.amount.toFixed(2)}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>
                <IconButton
                  color="primary"
                  onClick={() => setEditTransaction(t)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteTransaction(t.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}