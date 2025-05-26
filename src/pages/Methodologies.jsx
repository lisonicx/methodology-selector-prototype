import { useState } from 'react';
import comparisonImg from '../assets/methodologies.png';

const methodologies = [
  {
    name: 'Waterfall (ГОСТ 34)',
    short: 'Классическая каскадная модель жизненного цикла, формализованная в российском комплексе стандартов ГОСТ 34.  Этапы строго следуют друг за другом. ',
    details: (
      <>
        <h6 className="fw-semibold mt-3">Этапы по ГОСТ 34:</h6>
        <ul>
          <li>Формирование требований – определение целей и задач системы.</li>
          <li>Техническое задание – документирование требований и условий разработки.</li>
          <li>Эскизный проект – предварительное проектирование системы.</li>
          <li>Технический проект – детальное проектирование всех компонентов системы.</li>
          <li>Рабочая документация – подготовка документов для реализации системы.</li>
          <li>Ввод в действие – установка и запуск системы в эксплуатацию.</li>
          <li>Сопровождение – обслуживание и обновление системы после внедрения.</li>
        </ul>
        <h6 className="fw-semibold mt-3">Преимущества:</h6>
        <ul>
          <li>Стандартизированный подход к разработке систем.</li>
          <li>Обеспечивает полную документацию на всех этапах.</li>
          <li>Легкость в управлении и контроле за прогрессом.</li>
        </ul>
        <h6 className="fw-semibold">Недостатки:</h6>
        <ul>
          <li>Трудности при внесении изменений после завершения этапов.</li>
          <li>Отсутствие ранней обратной связи от пользователей.</li>
          <li>Риски обнаружения ошибок на поздних этапах разработки.</li>
        </ul>
        <h6 className="fw-semibold">Области применения:</h6>
        <ul>
          <li>Разработка государственных и корпоративных информационных систем.</li>
          <li>Проекты, требующие строгого соответствия нормативным документам.</li>
          <li>Системы с высокой степенью ответственности и критичности.</li>
        </ul>
        <h6 className="fw-semibold">🔗 Полезные материалы</h6>
        <ul>
          <li>
            <a href="https://www.geeksforgeeks.org/waterfall-model/" target="_blank" rel="noopener noreferrer">
              Waterfall Model – GeeksforGeeks
            </a>
          </li>
          <li>
            <a href="https://www.atlassian.com/agile/project-management/waterfall-methodology" target="_blank" rel="noopener noreferrer">
              Waterfall Methodology – Atlassian
            </a>
          </li>
          <li>
            <a href="https://docs.cntd.ru/document/1200020508" target="_blank" rel="noopener noreferrer">
              ГОСТ 34.601-90 – Технический проект автоматизированной системы
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    name: 'RUP (Rational Unified Process)',
    short: 'Процесс разработки программного обеспечения, разработанный IBM Rational, основанный на объектно-ориентированном подходе.',
    details: (
      <>
        <h6 className="fw-semibold mt-3">Фазы:</h6>
        <ul>
          <li>Инициация (Inception)</li>
          <li>Уточнение (Elaboration)</li>
          <li>Построение (Construction)</li>
          <li>Ввод в эксплуатацию (Transition)</li>
        </ul>
        <h6 className="fw-semibold mt-3">Преимущества:</h6>
        <ul>
          <li>Раннее получение промежуточных результатов.</li>
          <li>Акцент на выявление и снижение рисков на ранних этапах.</li>
          <li>Адаптация под особенности проекта.</li>
          <li>Процесс строго документирован.</li>
        </ul>
        <h6 className="fw-semibold">Недостатки:</h6>
        <ul>
          <li>Требует высокой квалификации команды.</li>
          <li>Возможна "бюрократизация" процесса.</li>
          <li>Высокая стоимость внедрения и обучения.</li>
        </ul>
        <h6 className="fw-semibold">Области применения:</h6>
        <ul>
          <li>Средние и крупные корпоративные проекты.</li>
          <li>Проекты с высокой степенью риска.</li>
          <li>Разработка ПО с длительным жизненным циклом.</li>
        </ul>
        <h6 className="fw-semibold">🔗 Полезные материалы</h6>
        <ul>
          <li>
            <a href="https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/lifecycle-management/7.0.2?topic=overview-rational-unified-process" target="_blank" rel="noopener noreferrer">
              IBM: Rational Unified Process Overview (архив)
            </a>
          </li>
          <li>
            <a href="http://www.agilemodeling.com/essays/rup.htm" target="_blank" rel="noopener noreferrer">
              RUP на сайте Agilemodeling.com
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Rational_Unified_Process" target="_blank" rel="noopener noreferrer">
              Rational Unified Process — Wikipedia
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    name: 'Scrum',
    short: 'Scrum — это фреймворк гибкой разработки, ориентированный на инкрементальное создание продукта с частыми поставками и активным участием заказчика.',
    details: (
      <>
        <h6 className="fw-semibold mt-3">Ключевые элементы:</h6>
        <ul>
          <li>Роли: Product Owner, Scrum Master, Scrum Team</li>
          <li>Артефакты: Product Backlog, Sprint Backlog, Increment</li>
          <li>События: Sprint (обычно 1–4 недели), Sprint Planning, Daily Scrum (Stand-up), Sprint Review, Sprint Retrospective</li>
        </ul>
        <h6 className="fw-semibold mt-3">Преимущества:</h6>
        <ul>
          <li>Адаптация к изменениям требований.</li>
          <li>Частая обратная связь.</li>
          <li>Прозрачность и видимость прогресса.</li>
        </ul>
        <h6 className="fw-semibold">Недостатки:</h6>
        <ul>
          <li>Требует высокой дисциплины и зрелости команды.</li>
          <li>Плохо масштабируется без дополнительных фреймворков</li>
          <li>Возможна путаница в ролях без должного обучения.</li>
        </ul>
        <h6 className="fw-semibold">Области применения:</h6>
        <ul>
          <li>Продуктовая разработка и стартапы.</li>
          <li>Внедрение новых функций в существующие системы.</li>
          <li>Проекты с высокой степенью неопределенности.</li>
          <li>Кросс-функциональные команды, способные принимать решения самостоятельно.</li>
        </ul>
        <h6 className="fw-semibold">🔗 Полезные материалы</h6>
        <ul>
          <li>
            <a href="https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Russian.pdf" target="_blank" rel="noopener noreferrer">
              Scrum Guide
            </a>
          </li>
          <li>
            <a href="https://www.scrum.org/" target="_blank" rel="noopener noreferrer">
              Scrum.org — тренинги и сертификация
            </a>
          </li>
          <li>
            <a href="https://ru.wikipedia.org/wiki/Scrum" target="_blank" rel="noopener noreferrer">
              Scrum на Wikipedia
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    name: 'Kanban',
    short: 'Визуальная система управления работой, которая фокусируется на непрерывной поставке, ограничении незавершенной работы и улучшении процессов.',
    details: (
      <>
        <h6 className="fw-semibold mt-3">Основные элементы:</h6>
        <ul>
          <li>Доска (Kanban Board)</li>
          <li>Карточки - отдельные задачи, перемещающиеся по колонкам</li>
          <li>WIP limits (ограничение незавершенной работы)</li>
          <li>Поток (Flow)</li>
        </ul>
        <h6 className="fw-semibold mt-3">Преимущества:</h6>
        <ul>
          <li>Прозрачность – вся команда видит текущее состояние задач.</li>
          <li>Гибкость – можно добавлять задачи в любое время, нет спринтов.</li>
          <li>Управление загрузкой – WIP-лимиты снижают перегрузку.</li>
          <li>Быстрое реагирование на изменения требований.</li>
        </ul>
        <h6 className="fw-semibold">Недостатки:</h6>
        <ul>
          <li>Сложно определить сроки выполнения задач.</li>
          <li>Нет встроенного механизма ретроспектив или планирования.</li>
        </ul>
        <h6 className="fw-semibold">Области применения:</h6>
        <ul>
          <li>Поддержка и эксплуатация информационных систем.</li>
          <li>IT-команды, обрабатывающие входящий поток задач (например, helpdesk).</li>
          <li>Малые команды с непрерывным потоком работы.</li>
          <li>Бизнес-процессы: маркетинг, рекрутинг, HR и др.</li>
        </ul>
        <h6 className="fw-semibold">🔗 Полезные материалы</h6>
        <ul>
          <li>
            <a href="https://kanbanguides.org/" target="_blank" rel="noopener noreferrer">
              Kanban Guide — официальная мини-методология
            </a>
          </li>
          <li>
            <a href="https://www.atlassian.com/agile/kanban/kanban-vs-scrum" target="_blank" rel="noopener noreferrer">
              Kanban vs Scrum — Atlassian
            </a>
          </li>
          <li>
            <a href="https://ru.wikipedia.org/wiki/Kanban" target="_blank" rel="noopener noreferrer">
              Kanban на Wikipedia
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function Methodologies() {
  const [open, setOpen] = useState(Array(methodologies.length).fill(false));

  const toggle = (index) => {
    const updated = [...open];
    updated[index] = !updated[index];
    setOpen(updated);
  };

return (
  <div className="container py-5">
    <h2 className="text-center mb-5">Методологии разработки</h2>
    <div className="text-center mb-5">
      <img
        src={comparisonImg}
        alt="Сравнение методологий разработки"
        className="img-fluid rounded shadow"
        style={{ maxWidth: '600px', width: '100%', height: 'auto' }}
      />
    </div>
    <div className="d-flex flex-column gap-4">
      {methodologies.map((method, i) => (
        <div key={i} className="border rounded shadow-sm p-4 bg-white">
          <h4 className="fw-bold text-dark">{method.name}</h4>
          <p className="text-muted mb-3">{method.short}</p>
          {open[i] && <div>{method.details}</div>}
          <button
            className="btn btn-sm text-white mt-3"
            style={{ backgroundColor: '#d35400', width: 'fit-content' }}
            onClick={() => toggle(i)}
          >
            {open[i] ? 'Скрыть' : 'Подробнее'}
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
