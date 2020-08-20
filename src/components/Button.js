import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { general } from "../constants/theme";

export const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.buttonStyle, ...props.style }}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 45,
    borderRadius: general.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
