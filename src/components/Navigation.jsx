import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">
          CashFlowr
        </Link>

        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Übersicht
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/transactions">
                Einnahmen / Ausgaben
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}