export default function Footer({ theme, onToggleTheme }) {
  return (
    <footer className="text-center py-3 mt-auto footer">
      <small>
        © {new Date().getFullYear()} CashFlowr · Budget Management App
      </small>
    </footer>
  )
}