import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "./src/screens/splash/Splash";
import { Home } from "./src/screens/Home/Home";
import { Login } from "./src/screens/Login/LoginScreen";
import { Registration } from "./src/screens/Registration/RegistrationScreen";
import { firebase } from "./src/firebase/config";

import { decode, encode } from "base-64";
import { Text, ImageBackground, Image, View } from "react-native";
import { typography, colors } from "./src/constants/theme";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const AuthStack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("loading");
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: "90%",
            resizeMode: "contain",
            justifyContent: "center",
          }}
          source={require("./assets/splash-alt.png")}
        />
        <View
          style={{
            position: "absolute",
            bottom: 10,
            color: colors.primary,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: colors.primary }}>Coded by </Text>
          <Text style={{ color: colors.secondary }}>Vesp. Inc</Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <AuthStack.Screen name="Home">
            {(props) => <Home {...props} extraData={user} />}
          </AuthStack.Screen>
        ) : (
          <>
            <AuthStack.Screen name="Splash" component={Splash} />
            <AuthStack.Screen name="Login">
              {(props) => <Login {...props} setUser={setUser} />}
            </AuthStack.Screen>
            <AuthStack.Screen name="Registration">
              {(props) => <Registration {...props} setUser={setUser} />}
            </AuthStack.Screen>
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
