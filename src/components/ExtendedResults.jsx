import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExtendedResults = ({ data }) => {
  const [showFull, setShowFull] = useState(false);

  const labels = data.map((item) => item.name);
  const scores = data.map((item) => item.score);
  const blocked = data.map((item) => item.blocked);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Оценка соответствия',
        data: scores,
        backgroundColor: blocked.map((b) =>
          b ? 'rgba(220, 53, 69, 0.7)' : 'rgba(40, 167, 69, 0.7)'
        ),
        borderColor: blocked.map((b) =>
          b ? 'rgb(220, 53, 69)' : 'rgb(40, 167, 69)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return (
    <div className="mt-5">
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          checked={showFull}
          id="toggleAnalysis"
          onChange={(e) => setShowFull(e.target.checked)}
          style={{
            borderColor: '#d35400',
            backgroundColor: showFull ? '#d35400' : 'transparent',
            boxShadow: showFull ? '0 0 0 0.15rem rgba(211, 84, 0, 0.25)' : 'none',
          }}
        />
        <label className="form-check-label fw-medium ms-2" htmlFor="toggleAnalysis">
          Показать полный анализ
        </label>
      </div>

      {showFull && (
        <div className="vstack gap-4">
          {/* Таблица */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Методология</th>
                    <th>Оценка</th>
                    <th>Исключена</th>
                    <th>Причина исключения</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((m) => (
                    <tr
                      key={m.name}
                      className={m.blocked ? 'table-danger' : ''}
                    >
                      <td>{m.name}</td>
                      <td>{m.score.toFixed(3)}</td>
                      <td className="text-center">{m.blocked ? 'Да' : 'Нет'}</td>
                      <td>{m.reason || (m.blocked ? '— причина не указана' : '')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* График */}
          {!data.every((d) => d.blocked || d.score === 0) && (
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Визуальное сравнение</div>
              <div className="card-body">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExtendedResults;
