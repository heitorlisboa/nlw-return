import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import { Copyright } from '../../../Copyright';

import successImageUrl from '../../../../assets/success.png';

type FeedbackSuccessStepProps = {
  onRestartFeedback: () => void;
};

export function FeedbackSuccessStep({
  onRestartFeedback,
}: FeedbackSuccessStepProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={successImageUrl} />

      <Text style={styles.title}>Agradeçemos o feedback!</Text>

      <TouchableOpacity style={styles.button} onPress={onRestartFeedback}>
        <Text style={styles.buttonLabel}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
