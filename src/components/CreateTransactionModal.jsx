import { useState } from 'react'
import ModalDialog from './ModalDialog'

export default function CreateTransactionModal({ onSave, editData, onClose }) {
  const [showModal, setShowModal] = useState(!!editData)
  const [transactionType, setTransactionType] = useState(editData?.type || null)
  const [title, setTitle] = useState(editData?.title || '')
  const [description, setDescription] = useState(editData?.description || '')
  const [amount, setAmount] = useState(editData?.amount || '')
  const [category, setCategory] = useState(editData?.category || '')
  const [error, setError] = useState('')



  const CATEGORIES = [
    'Essen',
    'Freizeit',
    'Rechnungen',
    'Transport',
    'Shopping',
    'Sonstiges'
  ]

  const openModal = (type) => {
    setTransactionType(type)
    setShowModal(true)
  }

  const closeModalInternal = () => {
    setShowModal(false)
    setTransactionType(null)
    setTitle('')
    setDescription('')
    setAmount('')
    setCategory('')
    onClose?.()
  }

  const handleSave = () => {
    if (!title || !amount || !category) {
    setError('Bitte fülle alle Pflichtfelder aus (Titel, Kategorie, Betrag).')
    return
  }
    setError('')

    onSave({ type: transactionType, title, description, category, amount: Number(amount) })
    closeModalInternal()
  }

  return (
    <>
      {!editData && (
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-success" onClick={() => openModal('income')}>
            Einnahme erfassen
          </button>
          <button className="btn btn-danger" onClick={() => openModal('expense')}>
            Ausgabe erfassen
          </button>
        </div>
      )}

      <ModalDialog
        title={transactionType === 'income' ? 'Einnahme' : 'Ausgabe'}
        show={showModal}
        onClose={closeModalInternal}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label">Titel</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Beschreibung</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategorie</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Kategorie auswählen</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Betrag (CHF)</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
            {error && (
              <div className="alert alert-danger mt-3">
                {error}
              </div>
            )}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModalInternal}
            >
              Abbrechen
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Speichern
            </button>
          </div>
        </form>
      </ModalDialog>
    </>
  )
}

