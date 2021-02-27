import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppTextBold } from "./AppTextBold";

export const AppButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.75}>
      <View style={{ ...styles.button, backgroundColor: props.color }}>
        <AppTextBold style={styles.text}>{props.children}</AppTextBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
