import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { typography, colors } from "../constants/theme";
import PropTypes from "prop-types";

export const Todo = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const [showOptions, setShowOptions] = useState(false);

  const handleTodoPress = () => {
    props.setCompleted(!checked);
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <View style={styles.container}>
      {showOptions ? (
        <MaterialCommunityIcons
          onPress={props.setShowDeleteModal}
          name="delete-forever"
          size={24}
          color={colors.secondary}
        />
      ) : null}
      <TouchableOpacity
        style={{
          ...styles.todo,
          ...props.style,
          width: showOptions ? "80%" : "100%",
        }}
        onPress={handleTodoPress}
        onLongPress={() => {
          props.setSelectedTodo();
          setShowOptions(!showOptions);
        }}
      >
        <Text style={{ ...typography.p, ...styles.text }}>{props.content}</Text>
        {checked ? (
          <Ionicons name="ios-checkmark-circle" size={24} color="white" />
        ) : (
          <FontAwesome name="circle" size={24} color="white" />
        )}
      </TouchableOpacity>
      {showOptions ? (
        <MaterialCommunityIcons
          name="playlist-edit"
          onPress={props.setShowUpdateModal}
          size={24}
          color={colors.gray}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todo: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    width: "80%",
  },
});

Todo.propTypes = {
  checked: PropTypes.bool,
  style: PropTypes.object,
  content: PropTypes.string,
  updateTodo: PropTypes.func,
};
