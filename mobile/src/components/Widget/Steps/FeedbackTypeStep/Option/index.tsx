import {
  TouchableOpacity,
  type TouchableOpacityProps,
  Image,
  type ImageSourcePropType,
  Text,
} from 'react-native';

import { styles } from './styles';

type OptionProps = TouchableOpacityProps & {
  title: string;
  image: ImageSourcePropType;
};

export function Option({ title, image, ...otherProps }: OptionProps) {
  return (
    <TouchableOpacity style={styles.container} {...otherProps}>
      <Image style={styles.image} source={image} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
