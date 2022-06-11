import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    borderRadius: 4,
  },
  label: {
    color: theme.colors.text_on_brand_color,
    fontSize: 14,
    fontFamily: theme.fonts.medium,
  },
});
