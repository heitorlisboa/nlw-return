import { StyleSheet } from "react-native";

import { theme } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 34,
  },
  image: {
    width: 36,
    height: 36,
    marginBottom: 10,
  },
  title: {
    color: theme.colors.text_primary,
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    marginBottom: 24,
  },
  button: {
    backgroundColor: theme.colors.surface_secondary,
    alignItems : 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 24,
    marginBottom: 56,
    borderRadius: 4,
  },
  buttonLabel: {
    color: theme.colors.text_primary,
    fontSize: 14,
    fontFamily: theme.fonts.medium,
  },
});
