import { AntDesign } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";
import { CalConfig } from "./calConfig";
import { Navbar } from "./Navbar";
import { AppButton } from "./ui/AppButton";

export const CalendarModal = (props) => {
  LocaleConfig.locales["ru"] = CalConfig;
  LocaleConfig.defaultLocale = "ru";

  const [selectedDate, setSelectedDate] = useState(props.current);
  const { todos } = useContext(TodoContext);

  const appMarkedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: THEME.MAIN_COLOR,
    },
  };

  todos.forEach((t) => {
    if (t.date != selectedDate) {
      if (!t.isChecked)
        appMarkedDates[t.date] = {
          marked: true,
          dotColor: THEME.DANGER_COLOR,
        };
    } else {
      if (!t.isChecked) {
        appMarkedDates[t.date]["marked"] = true;
        appMarkedDates[t.date]["dotColor"] = "#fff";
      }
    }
  });

  return (
    <View style={styles.viewWrap}>
      <Modal
        animationType="slide"
        visible={props.visible}
        presentationStyle="fullScreen"
      >
        <Navbar title="Выбор даты" />
        <View style={styles.wrap}>
          <Calendar
            markedDates={appMarkedDates}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            current={props.current}
            minDate={props.minDate}
          />
          <View style={styles.buttons}>
            <AppButton
              style={styles.button}
              color={THEME.GREY_COLOR}
              onPress={() => {
                setSelectedDate(props.current);
                props.onClose();
              }}
            >
              <AntDesign name="back" size={18} />
            </AppButton>
            <AppButton
              style={styles.button}
              color={THEME.MAIN_COLOR}
              onPress={() => {
                props.onSetDate(selectedDate);
                props.onClose();
              }}
            >
              Выбрать дату
            </AppButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    opacity: 1,
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: "50%",
  },
  wrap: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  viewWrap: {
    flex: 1,
  },
});
