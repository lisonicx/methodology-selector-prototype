export function applyHardFilters(input) {
  const blocked = {
    Waterfall: false,
    RUP: false,
    Scrum: false,
    Kanban: false,
  };

  // 1. Критичность проекта ≥ 4 → исключить Kanban
  if (parseInt(input.criticality) >= 4) blocked.Kanban = true;

  // 2. Формализация документации ≥ 4 → исключить Kanban
  if (parseInt(input.documentation) >= 4) blocked.Kanban = true;

  // 3. Вовлеченность заказчика ≤ 2 → исключить Scrum
  if (parseInt(input.involvement) <= 2) blocked.Scrum = true;

  // 4. Стабильность требований ≥ 4 → исключить Scrum и Kanban
  if (parseInt(input.stability) >= 4) {
    blocked.Scrum = true;
    blocked.Kanban = true;
  }

  // 5. Размер = Крупный И опыт команды < 3 → исключить Scrum и Kanban
  if (input.size === 'Крупный' && parseInt(input.experience) < 3) {
    blocked.Scrum = true;
    blocked.Kanban = true;
  }

  // 6. Зрелость процессов ≤ 2 → исключить Waterfall и RUP
  if (parseInt(input.maturity) <= 2) {
    blocked.Waterfall = true;
    blocked.RUP = true;
  }

  // 7. Распределенность команды = 4 И инфраструктура < 3 → исключить Scrum
  if (input.distribution === '4' && parseInt(input.infrastructure) < 3) {
    blocked.Scrum = true;
  }

  // 8. Инфраструктурная готовность ≤ 2 → исключить Scrum и Kanban
  if (parseInt(input.infrastructure) <= 2) {
    blocked.Scrum = true;
    blocked.Kanban = true;
  }

  return blocked;
}