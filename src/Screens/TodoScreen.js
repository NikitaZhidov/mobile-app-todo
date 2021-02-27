import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { THEME } from "../theme";
import { AppButton } from "../components/ui/AppButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = (props) => {
  const [modal, setModal] = useState(false);
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const todo = todos.find((t) => t.id === todoId);

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title, todo.isChecked);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        value={todo.title}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)} color={THEME.MAIN_COLOR}>
          <FontAwesome name="edit" size={16} />
        </AppButton>
      </AppCard>
      <View style={styles.butttons}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name="back" size={16} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={16} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  butttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 20,
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20,
    maxWidth: "85%",
  },
});
