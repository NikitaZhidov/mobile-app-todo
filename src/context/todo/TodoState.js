import React, { useReducer, useContext, useState } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContext";
import {
  ADD_TODO,
  CHANGE_CURRENT_DATE,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { Http } from "../../Http";

export const TodoState = (props) => {
  const getDateNow = () => {
    const dateNow = new Date(Date.now());
    let formattedDate = "";
    formattedDate += dateNow.getFullYear() + "-";
    formattedDate +=
      (dateNow.getMonth() + 1 < 10 ? "0" : "") + (dateNow.getMonth() + 1) + "-";
    formattedDate +=
      (dateNow.getDate() + 1 < 10 ? "0" : "") + dateNow.getDate();
    return formattedDate;
  };

  const initialState = {
    todos: [],
    loading: false,
    error: null,
    currentDate: getDateNow(),
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title, date = "", isChecked = false) => {
    clearError();
    const data = await Http.post(
      "https://rn-todo-ac449-default-rtdb.firebaseio.com/todos.json",
      { title, date, isChecked }
    );
    dispatch({ type: ADD_TODO, title, id: data.name, date, isChecked });
  };

  const clearOldTodo = async (id) => {
    changeScreen(null);
    await Http.delete(
      `https://rn-todo-ac449-default-rtdb.firebaseio.com/todos/${id}.json`
    );
    dispatch({ type: REMOVE_TODO, id });
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены что хотите удалить "${todo.title}"`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://rn-todo-ac449-default-rtdb.firebaseio.com/todos/${id}.json`
            );
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ]
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todo-ac449-default-rtdb.firebaseio.com/todos.json"
      );
      let todos = [];
      if (data) {
        todos = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
      }
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Что-то пошло не так, попробуйте снова");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title, isChecked = false) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-ac449-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title, isChecked }
      );
    } catch (e) {
      showError("Что-то пошло не так...");
      console.log(e);
    }

    dispatch({ type: UPDATE_TODO, id, title, isChecked });
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const changeCurrentDate = (currentDate) =>
    dispatch({ type: CHANGE_CURRENT_DATE, currentDate });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        changeCurrentDate,
        currentDate: state.currentDate,
        clearOldTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
