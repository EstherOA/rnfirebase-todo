import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { general } from "../constants/theme";

export const Input = (props) => {
  const [value, onChangeText] = useState("");

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={props.placeholder}
      onBlur={() => props.submitInput(value)}
      style={{ ...styles.input, ...props.style }}
      underlineColorAndroid="transparent"
      {...props.passThroughProps}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  submitInput: PropTypes.func,
  style: PropTypes.object,
  passThroughProps: PropTypes.any,
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#e6f1fd",
    borderRadius: general.radius,
    paddingHorizontal: 30,
  },
});
