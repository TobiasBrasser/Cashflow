export default function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto">
      <small>
        © {new Date().getFullYear()} CashFlowr · Budget Management App
      </small>
    </footer>
  )
}