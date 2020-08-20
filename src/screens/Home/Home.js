import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { Todo } from "../../components/Todo";
import { colors, typography } from "../../constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const Home = ({ navigation }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const user = navigation.extraData;

  const homeImage = require("../../../assets/todo.jpg");

  const DATA = [
    {
      id: 0,
      content: "Clean garden",
      checked: false,
    },
    {
      id: 1,
      content:
        "Water plants and go to the market for the drugs I bought yesterday",
      checked: true,
    },
    {
      id: 2,
      content: "Walk dogs",
      checked: false,
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Text style={{ ...typography.subtitle }}>Welcome, {user.fullName}</Text>
        <Ionicons name="ios-list-box" size={50} color={colors.secondary} />
      </View>
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Todo
              style={styles.todo}
              content={item.content}
              checked={item.checked}
              style={{ backgroundColor: colors.cards[item.id] }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="ios-add" color="white" size={60} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
