export const methodologies = ['Waterfall', 'RUP', 'Scrum', 'Kanban'];

export const scoreMatrix = {
  stability:       [1.0, 0.7, 0.3, 0.2],
  criticality:     [1.0, 0.9, 0.6, 0.3],
  maturity:        [1.0, 1.0, 0.7, 0.4],
  experience:      [0.6, 0.8, 1.0, 1.0],
  involvement:     [0.4, 0.6, 1.0, 0.9],
  complexity:      [1.0, 1.0, 0.7, 0.5],
  infrastructure:  [0.4, 0.6, 1.0, 1.0],
  documentation:   [1.0, 1.0, 0.5, 0.2],
  size: {
    Малый:   [0.4, 0.6, 1.0, 1.0],
    Средний: [0.8, 1.0, 0.8, 0.6],
    Крупный: [1.0, 1.0, 0.5, 0.3],
  },
  distribution: {
    1: [1.0, 1.0, 1.0, 1.0],
    2: [0.8, 0.9, 0.9, 1.0],
    3: [0.6, 0.8, 0.7, 0.9],
    4: [0.3, 0.6, 0.5, 1.0],
  }
};