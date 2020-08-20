import { StyleSheet } from "react-native";
import { colors, typography } from "../../constants/theme";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: 100,
  },
  header: {
    padding: 30,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.h1,
    color: "white",
  },
  listContainer: {
    borderTopLeftRadius: 30,
    paddingHorizontal: 30,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingVertical: 30,
    height: "80%",
  },
  todo: {
    marginBottom: 20,
  },
  fab: {
    borderRadius: 50,
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    alignItems: "center",
    alignSelf: "flex-end",
    elevation: 5,
    shadowColor: "black",
  },
});
