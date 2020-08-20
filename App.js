import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "./src/screens/splash/Splash";
import { Home } from "./src/screens/Home/Home";
import { Login } from "./src/screens/Login/LoginScreen";
import { Registration } from "./src/screens/Registration/RegistrationScreen";
import { firebase } from "./src/firebase/config";

import { decode, encode } from "base-64";
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

  if (loading) {
    return <></>;
  }

  useEffect(() => {
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

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        {user ? (
          <AuthStack.Screen name="Home">
            {(props) => <Home {...props} extraData={user} />}
          </AuthStack.Screen>
        ) : (
          <>
            <AuthStack.Screen name="Splash" component={Splash} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Registration" component={Registration} />
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
