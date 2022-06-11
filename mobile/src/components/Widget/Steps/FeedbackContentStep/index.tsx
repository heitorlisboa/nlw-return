import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system';

import { api } from '../../../../lib/api';
import { FEEDBACK_TYPES } from '../../../../utils/feedback';
import type { FeedbackType } from '@monorepo-shared/constants';

import { styles } from './styles';
import { theme } from '../../../../theme';
import { ScreenshotButton } from '../../../ScreenshotButton';
import { Button } from '../../../Button';
import { Copyright } from '../../../Copyright';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onRestartFeedback: () => void;
  onSendFeedback: () => void;
};

export function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  onSendFeedback,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = FEEDBACK_TYPES[feedbackType];

  function handleTextInputChange(text: string) {
    setComment(text);
  }

  async function handleFeedbackSubmit() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    try {
      const base64Screenshot =
        screenshot &&
        (await FileSystem.readAsStringAsync(screenshot, {
          encoding: 'base64',
        }));

      const screenshotWithDataType = `data:image/png;base64, ${base64Screenshot}`;

      await api.post('/feedbacks', {
        type: feedbackType,
        comment: comment.trim(),
        screenshot: screenshotWithDataType,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        // Network error
        if (error.code === 'ERR_NETWORK') {
          return alert(
            'Sem conexão ou servidor fora do ar, tente novamente mais tarde.'
          );
        }

        // Response error
        const responseError: string | undefined = error.response?.data.error;
        if (responseError) {
          return alert(responseError);
        }
      }

      // Unknown error
      return alert('Erro desconhecido ao enviar feedback.');
    } finally {
      setIsSendingFeedback(false);
    }

    onSendFeedback();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onRestartFeedback}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={feedbackTypeInfo.imageSource} />
          <Text style={styles.title}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder={feedbackTypeInfo.placeholder}
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={handleTextInputChange}
        multiline
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTaken={setScreenshot}
        />
        <Button isLoading={isSendingFeedback} onPress={handleFeedbackSubmit} />
      </View>

      <Copyright />
    </View>
  );
}
