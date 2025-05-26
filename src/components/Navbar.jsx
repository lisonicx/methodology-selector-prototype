import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{
        backgroundColor: '#ffffff',
        fontFamily: 'Manrope, sans-serif',
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Название */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: '#d35400' }}
        >
          Home
        </Link>

        {/* Навигационные ссылки */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/methodologies" className="nav-link text-secondary">
            Методологии
          </Link>
          <Link to="/history" className="nav-link text-secondary">
            История рекомендаций
          </Link>

          <Link
            to="/questionnaire"
            className="btn fw-semibold"
            style={{
              backgroundColor: '#d35400',
              color: '#fff',
              border: 'none'
            }}
          >
            Заполнить анкету
          </Link>
        </div>
      </div>
    </nav>
  );
}
