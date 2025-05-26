import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <main className="container flex-grow-1 d-flex align-items-center py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold mb-3">
              Выбери наилучшую <br/>
              методологию для своего проекта
            </h1>
            <p className="lead text-muted mb-4">
              Воспользуйся сервисом выбора методологии разработки ПО, чтобы определить,
              какой подход оптимален для твоей команды и проекта.
            </p>
            <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-md-start">
              <Link to="/questionnaire" className="btn btn-lg text-white" style={{ backgroundColor: '#d35400' }}>
                Получить рекомендацию
              </Link>
              <Link to="/methodologies" className="btn btn-outline-secondary btn-lg">
                Изучить методологии
              </Link>
            </div>
          </div>
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img src={heroImg} alt="Иллюстрация" className="img-fluid rounded shadow-sm" />
          </div>
        </div>
      </main>
    </div>
  );
}