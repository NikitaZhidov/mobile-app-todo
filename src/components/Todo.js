import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { THEME } from "../theme";
import { AppText } from "./ui/AppText";

export const Todo = (props) => {
  const changeCheckedHandler = () => {
    props.onChangeChecked(
      props.todo.id,
      props.todo.title,
      !props.todo.isChecked
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => props.onOpen(props.todo.id)}
      onLongPress={() => props.onRemove(props.todo.id)}
    >
      <View style={styles.todo}>
        <TouchableOpacity activeOpacity={0.6} onPress={changeCheckedHandler}>
          <View
            style={{
              ...styles.isCheckedBtn,
              backgroundColor: props.todo.isChecked ? THEME.GREY_COLOR : "#fff",
            }}
          >
            <AntDesign color="#fff" size={14} name="check" />
          </View>
        </TouchableOpacity>
        <AppText
          style={{
            ...styles.title,
            textDecorationLine: props.todo.isChecked ? "line-through" : "none",
            color: props.todo.isChecked ? THEME.GREY_COLOR : "#000",
          }}
        >
          {props.todo.title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    marginBottom: 10,
  },
  isCheckedBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    width: 26,
    borderColor: THEME.GREY_COLOR,
    borderWidth: 1,
    borderRadius: 13,
    marginRight: 10,
  },
  title: {
    fontFamily: "roboto-bold",
  },
});
