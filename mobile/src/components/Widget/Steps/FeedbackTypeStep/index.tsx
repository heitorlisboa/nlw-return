import { Text, View } from 'react-native';

import { FEEDBACK_TYPES } from '../../../../utils/feedback';

import type { FeedbackType } from '@monorepo-shared/constants';

import { styles } from './styles';
import { Option } from './Option';
import { Copyright } from '../../../Copyright';

type FeedbackTypeStepProps = {
  onChangeFeedbackType: (key: FeedbackType) => void;
};

export function FeedbackTypeStep({
  onChangeFeedbackType,
}: FeedbackTypeStepProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(FEEDBACK_TYPES).map(([key, { title, imageSource }]) => (
          <Option
            key={key}
            title={title}
            image={imageSource}
            onPress={() => onChangeFeedbackType(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
