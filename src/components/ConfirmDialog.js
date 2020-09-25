import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";
import { Button } from "./Button";

export const ConfirmDialog = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        presentationStyle="overFullScreen"
        visible={props.showDialog}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.buttonView}>
              <Button
                title="Cancel"
                onPress={props.onCancelPress}
                style={styles.cancelButton}
              />
              <Button
                title="Delete"
                onPress={props.onDeletePress}
                style={styles.deleteButton}
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
  text: {
    marginBottom: 20,
    width: "85%",
    fontSize: 15,
    textAlign: "center",
  },
  buttonView: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: colors.secondary,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: colors.cards[1],
    width: "45%",
  },
});
