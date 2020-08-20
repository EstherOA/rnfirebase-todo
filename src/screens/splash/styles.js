import { StyleSheet } from "react-native";
import { colors, typography } from "../../constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    ...typography.h1,
    textTransform: "uppercase",
  },
  subtitle: {
    ...typography.subtitle,
    color: "gray",
    marginBottom: 50,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  image: {
    width: "100%",
    marginBottom: 100,
  },
});
