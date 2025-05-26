import { useState } from 'react';
import { scoreMatrix, methodologies } from '../logic/scores';
import { weights } from '../logic/weights';
import { applyHardFilters } from '../logic/filters';
import { motion, AnimatePresence } from 'framer-motion';
import ExtendedResults from '../components/ExtendedResults';
import { questions } from '../logic/questions';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Компонент опросника
const Questionnaire = () => {
  // Начальные значения формы (характеристики проекта)
  const [form, setForm] = useState({
    stability: 3,
    criticality: 3,
    maturity: 3,
    experience: 3,
    involvement: 3,
    complexity: 3,
    infrastructure: 3,
    documentation: 3,
    size: 'Средний',
    distribution: '2',
  });

  // Шаг опроса, текущий результат
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  // Настройки экспертного режима
  const [expertMode, setExpertMode] = useState(false);
  const [customWeights, setCustomWeights] = useState({ ...weights });
  const [useFilters, setUseFilters] = useState(true);
  const [weightError, setWeightError] = useState(null);

  // Обновление значения одного поля формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Переход к следующему вопросу
  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  // Переход к предыдущему вопросу
  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  // Сброс формы и настроек
  const handleReset = () => {
    setForm({
      stability: 3,
      criticality: 3,
      maturity: 3,
      experience: 3,
      involvement: 3,
      complexity: 3,
      infrastructure: 3,
      documentation: 3,
      size: 'Средний',
      distribution: '2',
    });
    setStep(0);
    setResult(null);
    setExpertMode(false);
    setCustomWeights({ ...weights });
    setUseFilters(true);
    setWeightError(null);
  };

  // Автоматическая нормализация весов: приводит сумму к 1.0
const normalizeWeights = () => {
  const sum = Object.values(customWeights).reduce((acc, val) => acc + parseFloat(val), 0);
  if (sum === 0) return;

  const rawNormalized = {};
  let maxKey = null;
  let maxVal = 0;
  let total = 0;

  for (const key in customWeights) {
    const normalizedVal = customWeights[key] / sum;
    rawNormalized[key] = parseFloat(normalizedVal.toFixed(3));
    total += rawNormalized[key];

    if (rawNormalized[key] > maxVal) {
      maxVal = rawNormalized[key];
      maxKey = key;
    }
  }

  // Компенсируем остаток, чтобы сумма была ровно 1.0
  const correction = parseFloat((1.0 - total).toFixed(3));
  if (maxKey && Math.abs(correction) > 0.0001) {
    rawNormalized[maxKey] = parseFloat((rawNormalized[maxKey] + correction).toFixed(3));
  }

  setCustomWeights(rawNormalized);
  setWeightError(null);
};

  // Проверка корректности суммы весов (должна быть равна 1.0)
  const validateWeights = () => {
    const sum = Object.values(customWeights).reduce((acc, val) => acc + parseFloat(val), 0);
    if (Math.abs(sum - 1) > 0.001) {
      setWeightError(`Сумма весов должна быть равна 1.0 (текущая: ${sum.toFixed(3)})`);
      return false;
    }
    setWeightError(null);
    return true;
  };

  // Обновление значения одного веса по ключу
  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setCustomWeights((prev) => ({ ...prev, [name]: parsed }));
    }
  };

  // Обоснование исключения методологии по жёстким фильтрам
  const getExclusionReason = (methodology, form) => {
    const reasons = [];

    if (form.criticality >= 4 && methodology === 'Kanban')
      reasons.push('Критичность проекта ≥ 4');
    if (form.documentation >= 4 && methodology === 'Kanban')
      reasons.push('Формализация документации ≥ 4');
    if (form.involvement <= 2 && methodology === 'Scrum')
      reasons.push('Вовлечённость заказчика ≤ 2');
    if (form.stability >= 4 && ['Scrum', 'Kanban'].includes(methodology))
      reasons.push('Стабильность требований ≥ 4');
    if (
      form.size === 'Крупный' &&
      form.experience < 3 &&
      ['Scrum', 'Kanban'].includes(methodology)
    )
      reasons.push('Крупный проект и опыт < 3');
    if (form.maturity <= 2 && ['Waterfall', 'RUP'].includes(methodology))
      reasons.push('Зрелость процессов ≤ 2');
    if (
      form.distribution === '4' &&
      form.infrastructure < 3 &&
      methodology === 'Scrum'
    )
      reasons.push('Распределённость = 4 и инфраструктура < 3');
    if (
      form.infrastructure <= 2 &&
      ['Scrum', 'Kanban'].includes(methodology)
    )
      reasons.push('Инфраструктура ≤ 2');

    return reasons.join('; ');
  };

  // Расчёт результата на основе введённых данных
  const handleSubmit = () => {
    if (expertMode && !validateWeights()) return;

    const activeWeights = expertMode ? customWeights : weights;
    const filtered = useFilters ? applyHardFilters(form) : {};

    const scores = methodologies.map((_, i) => {
      let total = 0;
      for (const key in activeWeights) {
        const weight = parseFloat(activeWeights[key]) || 0;

        const val =
          key === 'size' || key === 'distribution'
            ? scoreMatrix[key][form[key]][i]
            : (parseInt(form[key]) / 5) * scoreMatrix[key][i];

        total += filtered[methodologies[i]] ? 0 : weight * val;
      }
      return total;
    });

    const combined = methodologies.map((name, i) => ({
      name,
      score: scores[i],
      blocked: filtered[name],
      reason: filtered[name] ? getExclusionReason(name, form) : '',
    }));

    const allBlocked = combined.every((m) => m.blocked);
    const allZero = combined.every((m) => m.score === 0);

    if (!(allBlocked || allZero)) {
      combined.sort((a, b) => b.score - a.score);
    }

    setResult(combined);
  };

  // Текущий активный вопрос
  const current = questions[step];

return (
  <div className="container py-5" style={{ fontFamily: 'Manrope, sans-serif' }}>
    {!result && (
    <div className="bg-white shadow rounded p-5">
          <h2 className="text-center fw-bold mb-4 display-6 text-dark">
            Ответь на вопросы по проекту и получи рекомендацию методологии
          </h2>
      {!result && (
        <div className="border border-secondary-subtle bg-light-subtle rounded p-4 mb-5">
          <label className="form-check d-flex align-items-center gap-2">
            <input
              type="checkbox"
              className="form-check-input custom-checkbox-orange"
              checked={expertMode}
              onChange={() => {
                const next = !expertMode;
                setExpertMode(next);
                if (!next) {
                  setCustomWeights({ ...weights });
                  setUseFilters(true);
                  setWeightError(null);
                }
              }}
            />
            <span className="fw-semibold text-warning-emphasis">Экспертный режим</span>
          </label>

          {expertMode && (
            <>
              <p className="small text-warning mt-2">
                ⚠️ Продвинутый режим. Требуется знание предметной области.
              </p>

              <div className="form-check mt-3">
                <input
                  type="checkbox"
                   className="form-check-input custom-checkbox-orange"
                  checked={useFilters}
                  onChange={() => setUseFilters(!useFilters)}
                  id="useFilters"
                />
                <label htmlFor="useFilters" className="form-check-label">
                  Применять жёсткие фильтры
                </label>
              </div>

              <div className="mt-4">
                <label className="form-check-label fw-semibold mb-3">
                  Ручная настройка весов:
                </label>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  {Object.keys(customWeights).map((key) => (
                    <div className="col" key={key}>
                      <label className="form-label small fw-medium">
                        {questions.find((q) => q.key === key)?.label || key}
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        name={key}
                        value={customWeights[key]}
                        onChange={handleWeightChange}
                        className="form-control"
                      />
                    </div>
                  ))}
                </div>

                {weightError && (
                  <p className="text-danger small mt-3">{weightError}</p>
                )}

                <div className="d-flex gap-3 flex-wrap mt-3">
                  <button
                    type="button"
                    onClick={normalizeWeights}
                    className="btn btn-outline-secondary"
                  >
                    Нормализовать веса автоматически
                  </button>

                  <button
                      type="button"
                      onClick={() => {
                        setCustomWeights({ ...weights });
                        setWeightError(null);
                      }}
                      className="btn btn-outline-secondary"
                    >
                      Сбросить к значениям по умолчанию
                    </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (validateWeights()) {
                        alert('✅ Веса успешно применены!');
                      }
                    }}
                    className="btn btn-outline-success"
                  >
                    Применить веса
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )}

{!result && (
  <>
    {/* Индикатор прогресса */}
    <div className="mb-4 mt-4">
      <div className="d-flex justify-content-between small text-muted mb-2">
        <span>Вопрос {step + 1} из {questions.length}</span>
        <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
      </div>
      <div className="progress" style={{ height: '8px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${((step + 1) / questions.length) * 100}%`,
            backgroundColor: '#d35400'
          }}
        ></div>
      </div>
    </div>

    {/* Ввод вопроса */}
    <AnimatePresence mode="wait">
      <motion.div
        key={current.key}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <label className="form-label fw-semibold mb-3 d-block">
          {current.label}
        </label>

        {current.type === 'scale' ? (
          <div className="vstack gap-2">
            {current.options.map((desc, i) => (
              <div className="form-check d-flex align-items-start" key={i}>
                <input
                  className="form-check-input mt-1"
                  type="radio"
                  name={current.key}
                  value={i + 1}
                  checked={Number(form[current.key]) === i + 1}
                  onChange={handleChange}
                  id={`${current.key}_${i}`}
                />
                <label htmlFor={`${current.key}_${i}`} className="form-check-label ms-2">
                  <strong>{i + 1}</strong> – {desc}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <select
            name={current.key}
            value={form[current.key]}
            onChange={handleChange}
            className="form-select"
          >
            {current.options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </motion.div>
    </AnimatePresence>

    {/* Навигация */}
    <div className="d-flex justify-content-between mt-4">
      <button
        onClick={handleBack}
        disabled={step === 0}
        className="btn btn-outline-secondary"
      >
        Назад
      </button>

      <button
        onClick={handleNext}
        disabled={step === questions.length - 1}
          className="btn text-white"
          style={{ backgroundColor: '#d35400' }}
      >
        Далее
      </button>
    </div>

    {/* Завершение */}
    {step === questions.length - 1 && (
      <div className="text-center mt-5">
        <button
          onClick={handleSubmit}
          className="btn btn-lg text-white px-5 py-3"
          style={{ backgroundColor: '#d35400' }}
        >
          Посмотреть результат
        </button>

        <div className="mt-3">
          <button
            onClick={handleReset}
            className="btn btn-link text-muted small"
          >
            Сбросить форму
          </button>
        </div>
      </div>
    )}
  </>
)}

{result && (
  <>
    <div id="pdf-export">
      <h3 className="h4 fw-bold mt-4 mb-4 text-dark">Выбранные характеристики:</h3>

      <div className="bg-light border rounded p-4 mb-5">
        <ul className="list-unstyled small mb-0">
          {questions.map((q) => (
            <li key={q.key} className="mb-2">
              <strong>{q.label}</strong>:{" "}
              {q.type === "scale"
                ? `${form[q.key]} – ${q.options[form[q.key] - 1]}`
                : q.options.find((opt) => opt.value === form[q.key])?.label || form[q.key]}
            </li>
          ))}
        </ul>
      </div>

      {result.every((r) => r.blocked || r.score === 0) && (
        <div className="alert alert-danger" role="alert">
          ❗ Подходящая методология не найдена по заданным условиям.
        </div>
      )}

      <h3 className="h4 fw-bold mb-4 text-dark">Рекомендуемая методология:</h3>

      {!result.every((r) => r.blocked || r.score === 0) && (
        <>
          <div className="alert alert-success">
            <h4 className="h5 fw-bold mb-1">{result[0].name}</h4>
            <p className="mb-0">
              Оценка соответствия: <strong>{result[0].score.toFixed(3)}</strong>
            </p>
          </div>

          {result[1] && !result[1].blocked &&
            (result[0].score - result[1].score) / result[0].score < 0.05 && (
              <div className="alert alert-warning">
                <h5 className="fw-bold">Альтернатива:</h5>
                <p className="mb-0">
                  Методология <strong>{result[1].name}</strong> также может подойти (разница &lt; 5%).
                </p>
              </div>
            )}
        </>
      )}

      <ExtendedResults data={result} />
    </div>

    <div className="d-flex gap-3 justify-content-center flex-wrap mt-5">
      <button
        onClick={() => {
          const content = document.getElementById("pdf-export");
          if (!content) return;
          const margin = 10;

          html2canvas(content, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const availableWidth = pageWidth - margin * 2;
            const imgHeight = (canvas.height * availableWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, imgHeight);
            pdf.save('Методология_разработки_ПО.pdf');
          });
        }}
          className="btn text-white"
          style={{ backgroundColor: '#d35400' }}
      >
        Скачать отчёт
      </button>

      <button
        onClick={() => {
          try {
            const existing = JSON.parse(localStorage.getItem("methodologyHistory")) || [];
            const record = {
              timestamp: new Date().toISOString(),
              input: form,
              result,
            };
            localStorage.setItem("methodologyHistory", JSON.stringify([record, ...existing]));
            alert("Результат сохранён!");
          } catch {
            alert("⚠️ Не удалось сохранить результат.");
          }
        }}
          className="btn text-white"
          style={{ backgroundColor: '#d35400' }}
      >
        Сохранить результат
      </button>

      <button
        onClick={handleReset}
        className="btn text-white"
        style={{ backgroundColor: '#d35400' }}
      >
        Пройти ещё раз
      </button>
    </div>
  </>
)}
    </div>
  );
};

export default Questionnaire;
