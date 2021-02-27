import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";
import { CalendarModal } from "./CalendarModal";

export const AddTodo = (props) => {
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);

  const pressHandler = () => {
    if (value.trim()) {
      props.onSubmit(value, props.currentDate, false);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Введите название задачи");
    }
  };

  return (
    <View>
      <AppButton color={THEME.MAIN_COLOR} onPress={() => setModal(true)}>
        {props.currentDate}
      </AppButton>
      <View style={styles.block}>
        <CalendarModal
          visible={modal}
          current={props.currentDate}
          minDate={props.minDate}
          onClose={() => setModal(false)}
          onSetDate={(date) => props.setCurrentDate(date)}
        />
        <TextInput
          style={styles.input}
          value={value}
          placeholder="Новая задача"
          onChangeText={(text) => setValue(text)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <AppButton onPress={pressHandler} color={THEME.MAIN_COLOR}>
          <AntDesign name="pluscircleo" size={16}></AntDesign>
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    width: "80%",
    marginRight: 10,
    borderColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
    padding: 3,
  },
  dateBtn: {
    marginBottom: 15,
  },
});
