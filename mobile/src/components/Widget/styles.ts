import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { theme } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    position: 'absolute',
    right: 16,
    bottom: getBottomSpace() + 16,
    borderRadius: 9999,
  },
  modal: {
    backgroundColor: theme.colors.surface_primary,
    paddingBottom: getBottomSpace() + 16,
  },
  modalIndicator: {
    backgroundColor: theme.colors.text_primary,
    width: 56,
  },
});
