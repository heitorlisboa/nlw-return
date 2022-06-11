import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import type { FeedbackType } from '@monorepo-shared/constants';

import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export function Widget() {
  const [selectedFeedbackType, setSelectedFeedbackType] =
    useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setSelectedFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleSendFeedback() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.modalIndicator}
      >
        {!selectedFeedbackType ? (
          <FeedbackTypeStep onChangeFeedbackType={setSelectedFeedbackType} />
        ) : !feedbackSent ? (
          <FeedbackContentStep
            feedbackType={selectedFeedbackType}
            onRestartFeedback={handleRestartFeedback}
            onSendFeedback={handleSendFeedback}
          />
        ) : (
          <FeedbackSuccessStep onRestartFeedback={handleRestartFeedback} />
        )}
      </BottomSheet>
    </>
  );
}
