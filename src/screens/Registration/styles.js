import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 20,
  },
  image: {
    marginBottom: 30,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  link: { color: colors.secondary },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
