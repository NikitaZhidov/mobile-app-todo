import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { ScreenContext } from "./context/screen/screenContext";
import { MainScreen } from "./Screens/MainScreen";
import { TodoScreen } from "./Screens/TodoScreen";

export const MainLayout = (props) => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.wrap}>
      <Navbar title="Todo App"></Navbar>
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flex: 1,
  },
  wrap: {
    flex: 1,
  },
});
