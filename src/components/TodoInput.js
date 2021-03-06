import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";
import { Button } from "./Button";
import { Input } from "./Input";
import { firebase } from "../firebase/config";

export const TodoInput = (props) => {
  const [task, setTask] = useState(props.task || "");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        onPress={props.handleRemove}
        transparent
        presentationStyle="overFullScreen"
        visible={props.showModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              placeholder="Enter a task..."
              submitInput={setTask}
              style={styles.input}
              initialValue={props.task}
              numberOfLines={3}
              textAlignVertical="top"
              multiline
            />
            <View style={styles.buttonView}>
              <Button
                title="Cancel"
                onPress={props.onCancelPress}
                style={styles.cancelButton}
              />
              <Button
                title="Save"
                onPress={() => {
                  props.task
                    ? props.handleUpdate(task)
                    : props.handleCreate(task);
                }}
                style={styles.saveButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginBottom: 20,
    width: "85%",
    borderColor: "#e5e5e5",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    fontSize: 15,
  },
  buttonView: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: colors.secondary,
    width: "45%",
  },
  saveButton: {
    backgroundColor: colors.cards[1],
    width: "45%",
  },
});
