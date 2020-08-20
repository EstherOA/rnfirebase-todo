import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "../../components/Button";
import styles from "./styles";

const splashImg = require("../../../assets/splash-alt.png");

export const Splash = ({ navigation }) => {
  const navigateSignUp = () => {
    navigation.navigate("Registration");
  };

  const navigateSignIn = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TODO</Text>
      <Text style={styles.subtitle}>Manage your daily activities</Text>
      <Image source={splashImg} style={styles.image} />
      <Button
        title="Sign In"
        style={styles.buttonPrimary}
        onPress={navigateSignIn}
      />
      <Button
        title="Sign Up"
        style={styles.buttonSecondary}
        onPress={navigateSignUp}
      />
    </View>
  );
};
