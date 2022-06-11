import { StyleSheet } from 'react-native';

import { theme } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    color: theme.colors.text_primary,
    fontSize: 20,
    fontFamily: theme.fonts.medium,
  },
  input: {
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.regular,
    width: '100%',
    height: 112,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});
