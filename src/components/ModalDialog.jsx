export default function ModalDialog({ title, show, onClose, children }) {
  if (!show) {
    return null
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              {children}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
