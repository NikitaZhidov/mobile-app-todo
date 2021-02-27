import React, { useContext, useEffect, useCallback, useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppButton } from "../components/ui/AppButton";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

export const MainScreen = (props) => {
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

  const {
    addTodo,
    todos,
    removeTodo,
    fetchTodos,
    loading,
    error,
    changeCurrentDate,
    currentDate,
    clearOldTodo,
    updateTodo,
  } = useContext(TodoContext);

  const { changeScreen } = useContext(ScreenContext);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
    todos.forEach((t) => {
      if (new Date(t.date).getTime() < new Date(getDateNow()).getTime()) {
        clearOldTodo(t.id);
      }
    });
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos} color={THEME.MAIN_COLOR}>
          Попробовать снова
        </AppButton>
      </View>
    );
  }

  const currentDateTodos = todos.filter((t) => t.date == currentDate);

  let content = (
    <View style={styles.listWrap}>
      <FlatList
        data={currentDateTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Todo
            todo={item}
            onRemove={removeTodo}
            onOpen={changeScreen}
            onChangeChecked={updateTodo}
          />
        )}
      />
    </View>
  );

  if (currentDateTodos == 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AddTodo
        onSubmit={addTodo}
        currentDate={currentDate}
        minDate={getDateNow()}
        setCurrentDate={changeCurrentDate}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 20,
  },
  listWrap: {
    flex: 1,
  },
});
