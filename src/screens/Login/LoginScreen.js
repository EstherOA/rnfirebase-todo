import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
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

export const Login = ({ navigation, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateSignUp = () => {
    navigation.navigate("Registration");
  };

  const onSubmitLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .where("id", "==", uid)
          .get()
          .then((firestoreDoc) => {
            if (!firestoreDoc.exists) {
              alert("User does not exist");
              return;
            }
            const user = firestoreDoc.data();
            setUser(user);
            navigation.navigate("Home", { user });
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
          placeholder="Email"
          submitInput={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          submitInput={setPassword}
        />
        <Button
          style={styles.buttonPrimary}
          title="Sign In"
          onPress={onSubmitLogin}
        />
        <View style={styles.linkContainer}>
          <Text>Don't have an account? </Text>
          <Text style={styles.link} onPress={navigateSignUp}>
            Sign Up
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
