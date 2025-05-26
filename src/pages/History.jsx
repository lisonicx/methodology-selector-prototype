import { useEffect, useState } from 'react';
import { questions } from '../logic/questions';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('methodologyHistory')) || [];
    setHistory(stored.reverse());
  }, []);

  const handleClear = () => {
    if (confirm('Удалить всю историю?')) {
      localStorage.removeItem('methodologyHistory');
      setHistory([]);
    }
  };

  const handleDelete = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    localStorage.setItem('methodologyHistory', JSON.stringify([...updated].reverse()));
    setHistory(updated);
  };

  return (
    <div className="container py-5" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <h2 className="text-center fw-bold mb-5 display-6">История сохранённых результатов</h2>

      {history.length === 0 ? (
        <div className="alert alert-secondary text-center">
          Сохранённых записей пока нет.
        </div>
      ) : (
        <>
          <div className="text-end mb-4">
            <button
              onClick={handleClear}
              className="btn text-white"
              style={{ backgroundColor: '#d35400' }}
            >
              Очистить историю
            </button>
          </div>

          <div className="vstack gap-4">
            {history.map((entry, i) => (
              <div key={i} className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">
                      Сохранено: {new Date(entry.timestamp).toLocaleString()}
                    </small>
                    <button
                      onClick={() => handleDelete(i)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Удалить
                    </button>
                  </div>

                  <h5 className="fw-semibold mb-2">Выбранные характеристики:</h5>
                  <ul className="list-unstyled small mb-4">
                    {questions.map((q) => (
                      <li key={q.key}>
                        <strong>{q.label}</strong>:{" "}
                        {q.type === 'scale'
                          ? `${entry.input[q.key]} – ${q.options[entry.input[q.key] - 1]}`
                          : q.options.find((opt) => opt.value === entry.input[q.key])?.label || entry.input[q.key]}
                      </li>
                    ))}
                  </ul>

                  <h5 className="fw-semibold mb-2">Оценки методологий:</h5>
                  <ul className="list-unstyled small">
                    {entry.result.map((r) => (
                      <li key={r.name}>
                        {r.name} —{" "}
                        {r.blocked
                          ? <>Исключена {r.reason && <> (Причина: {r.reason})</>}</>
                          : <>Оценка: <strong>{r.score.toFixed(3)}</strong></>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
