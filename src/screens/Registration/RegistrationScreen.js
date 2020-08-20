import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from "./styles";
import { firebase } from "../../firebase/config";

const image = require("../../../assets/splash-alt.png");

export const Registration = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateSignIn = () => {
    navigation.navigate("Login");
  };

  const onSubmitRegistration = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={image} />
        <Input
          style={styles.input}
          placeholder="Full Name"
          submitInput={setFullName}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          submitInput={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          submitInput={setPassword}
        />
        <Input
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          submitInput={setConfirmPassword}
        />
        <Button
          style={styles.buttonPrimary}
          title="Sign Up"
          onPress={onSubmitRegistration}
        />
        <View style={styles.linkContainer}>
          <Text>Don't have an account? </Text>
          <Text style={styles.link} onPress={navigateSignIn}>
            Sign In
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
