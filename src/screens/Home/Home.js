import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { Todo } from "../../components/Todo";
import { colors, typography } from "../../constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TodoInput } from "../../components/TodoInput";
import { firebase } from "../../firebase/config";
import { ConfirmDialog } from "../../components/ConfirmDialog";

export const Home = ({ navigation, extraData: user }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const homeImage = require("../../../assets/todo.jpg");

  getAllTodos = async () => {
    const resultList = [];
    await firebase
      .firestore()
      .collection("todos")
      .where("userId", "==", user.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          resultList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodoList(resultList);
      })
      .catch((err) => {
        console.log("Error while retrieving todos: ", err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getAllTodos();
    setLoading(false);
  }, []);

  getTodoColor = () => {
    const index = Math.floor(Math.random() * Math.floor(3));
    return colors.cards[index];
  };

  createTodo = (task) => {
    const timestamp = new Date();
    setLoading(true);
    firebase
      .firestore()
      .collection("todos")
      .add({
        content: task.trim(),
        createdAt: timestamp,
        updatedAt: timestamp,
        completed: false,
        userId: user.id,
      })
      .then((doc) => {
        getAllTodos();
        setShowModal(false);
      })
      .catch((err) => {
        console.log("Error creating todo: ", err);
      });
    setLoading(false);
  };

  getTodo = (id) => {
    let foundTodo = null;
    todoList.map((todo) => {
      if (todo.id === id) {
        foundTodo = todo;
      }
    });
    return foundTodo;
  };

  updateTodo = (id, data) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("todos")
      .doc(id)
      .update(data)
      .then((doc) => {
        getAllTodos();
        setShowModal(false);
      })
      .catch((err) => {
        console.log(`Error while retrieving todo: ${id} :`, err);
      });
    setLoading(false);
  };

  deleteTodo = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("todos")
      .doc(selectedTodo)
      .delete()
      .then((doc) => {
        getAllTodos();
        setShowDialog(false);
      })
      .catch((err) => {
        console.log(`Error while deleting user ${selectedTodo}: `, err);
      });
    setLoading(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <Text style={styles.title}>Home</Text>
          <Text style={{ ...typography.subtitle, color: colors.cards[0] }}>
            Welcome, {user.fullName}
          </Text>
        </View>
        <Ionicons name="ios-list-box" size={50} color={colors.secondary} />
      </View>
      <SafeAreaView style={styles.listContainer}>
        <ActivityIndicator animating={loading} color={colors.cards[1]} />
        <FlatList
          data={todoList}
          renderItem={({ item }) => (
            <Todo
              style={styles.todo}
              content={item.content}
              setShowDeleteModal={() => setShowDialog(true)}
              setShowUpdateModal={() => setShowModal(true)}
              setSelectedTodo={() => setSelectedTodo(item.id)}
              setCompleted={(isChecked) =>
                updateTodo(item.id, { completed: isChecked })
              }
              checked={item.completed}
              style={{ backgroundColor: getTodoColor() }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <TodoInput
          showModal={showModal}
          handleCreate={createTodo}
          handleRemove={() => setShowDialog(true)}
          handleUpdate={(task) => updateTodo(selectedTodo, { content: task })}
          onCancelPress={() => setShowModal(false)}
          task={
            selectedTodo && getTodo(selectedTodo)
              ? getTodo(selectedTodo).content
              : ""
          }
        />
        <ConfirmDialog
          text="Are you sure you want to delete this todo?"
          showDialog={showDialog}
          onCancelPress={() => setShowDialog(false)}
          onDeletePress={deleteTodo}
        />
        <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
          <Ionicons name="ios-add" color="white" size={40} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
