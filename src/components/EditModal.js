import React, { useState } from "react";
import { TextInput, StyleSheet, View, Modal, Alert } from "react-native";

import { THEME } from "../theme";
import { Navbar } from "./Navbar";
import { AppButton } from "./ui/AppButton";

export const EditModal = (props) => {
  const [title, setTitle] = useState(props.value);

  const saveHandler = () => {
    if (title.trim().length < 1) {
      Alert.alert(
        "Ошибка",
        `Минимальная длина 1 символ. Сейчас ${title.trim().length} символов.`
      );
    } else {
      props.onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(props.value);
    props.onCancel();
  };

  return (
    <View style={styles.viewWrap}>
      <Modal
        animationType="slide"
        visible={props.visible}
        presentationStyle="fullScreen"
      >
        <Navbar title="Изменение задачи" />
        <AppButton>J</AppButton>
        <View style={styles.wrap}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Введите название"
          />
          <View style={styles.buttons}>
            <AppButton
              style={styles.btn}
              onPress={cancelHandler}
              color={THEME.DANGER_COLOR}
            >
              Отменить
            </AppButton>
            <AppButton
              style={styles.btn}
              onPress={saveHandler}
              color={THEME.MAIN_COLOR}
            >
              Сохранить
            </AppButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  btn: {},
  buttons: {
    flexDirection: "row",
    opacity: 1,
    width: "100%",
    minWidth: 20,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  viewWrap: {
    flex: 1,
  },
});
