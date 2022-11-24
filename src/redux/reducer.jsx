import { statusFilters } from './constants';
// Импортируем функцию композиции редюсеров
import { combineReducers } from 'redux';

const taskInitialState = [
  { id: 0, text: 'Learn HTML and CSS', completed: true },
  { id: 1, text: 'Get good at JavaScript', completed: true },
  { id: 2, text: 'Master React', completed: false },
  { id: 3, text: 'Discover Redux', completed: false },
  { id: 4, text: 'Build amazing apps', completed: false },
];

// Используем initialState как значение состояния по умолчанию
export const taskReducer = (state = taskInitialState, action) => {
  // Редюсер различает экшены по значению свойства type
  switch (action.type) {
    // В зависимости от типа экшена будет выполняться разная логика
    // Нужно вернуть новый объект состояния
    // в котором есть все данные существующего состояния
    // и новый массив задач
    // в котором есть все существующие задачи
    // и объект новой задачи
    case 'tasks/addTask': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    case 'tasks/deleteTask':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'tasks/toggleCompleted':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id !== action.payload) {
            return task;
          }
          return {
            ...task,
            completed: !task.completed,
          };
        }),
      };
    default:
      // Каждый редюсер получает все экшены отправленные в стор.
      // Если редюсер не должен обрабатывать какой-то тип экшена,
      // необходимо вернуть существующее состояние без изменений.
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

export const filterReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter':
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };

    default:
      // Каждый редюсер получает все экшены отправленные в стор.
      // Если редюсер не должен обрабатывать какой-то тип экшена,
      // необходимо вернуть существующее состояние без изменений.
      return state;
  }
};

// export const rootReducer = (state = {}, action) => {
//   // Возвращаем объект состояния
//   return {
//     // Обоим редюсерам передаем только часть состояния за которую они отвечают
//     tasks: taskReducer(state.tasks, action),
//     filters: filterReducer(state.filters, action),
//   };
// };

export const rootReducer = combineReducers({
  tasks: taskReducer,
  filters: filterReducer,
});
