import { useState } from 'react'
import ModalDialog from './ModalDialog'

export default function CreateTransactionModal({ onSave, editData, onClose }) {
  const [showModal, setShowModal] = useState(!!editData)
  const [transactionType, setTransactionType] = useState(editData?.type || null)
  const [title, setTitle] = useState(editData?.title || '')
  const [description, setDescription] = useState(editData?.description || '')
  const [amount, setAmount] = useState(editData?.amount || '')

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
    onClose?.()
  }

  const handleSave = () => {
    onSave({ type: transactionType, title, description, amount: Number(amount) })
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
            <label className="form-label">Betrag (CHF)</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

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
              disabled={!title || !amount}
            >
              Speichern
            </button>
          </div>
        </form>
      </ModalDialog>
    </>
  )
}

