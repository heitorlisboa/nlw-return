import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface_secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 4,
  },
  screenshot: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  removeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
