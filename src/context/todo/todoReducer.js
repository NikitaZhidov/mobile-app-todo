import {
  ADD_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  UPDATE_TODO,
  HIDE_LOADER,
  CLEAR_ERROR,
  SHOW_ERROR,
  FETCH_TODOS,
  CHANGE_CURRENT_DATE,
} from "../types";

const handlers = {
  [ADD_TODO]: (state, action) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: action.id,
        title: action.title,
        date: action.date,
        isChecked: action.isChecked,
      },
    ],
  }),
  [REMOVE_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.id),
  }),
  [UPDATE_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === action.id) {
        todo.title = action.title;
        todo.isChecked = action.isChecked;
      }
      return todo;
    }),
  }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, action) => ({ ...state, error: action.error }),
  [FETCH_TODOS]: (state, action) => ({ ...state, todos: action.todos }),
  [CHANGE_CURRENT_DATE]: (state, action) => ({
    ...state,
    currentDate: action.currentDate,
  }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
