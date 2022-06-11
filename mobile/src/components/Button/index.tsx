import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../theme';

type ButtonProps = TouchableOpacityProps & {
  isLoading: boolean;
};

export function Button({ isLoading, ...otherProps }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...otherProps}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.label}>Enviar feedback</Text>
      )}
    </TouchableOpacity>
  );
}
