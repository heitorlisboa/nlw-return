import { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { Camera, Trash } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';

import { styles } from './styles';
import { theme } from '../../theme';

type ScreenshotButtonProps = {
  screenshot: string | null;
  onScreenshotTaken: (screenshot: string | null) => void;
};

export function ScreenshotButton({
  screenshot,
  onScreenshotTaken,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const imageUri = await captureScreen({
      format: 'jpg',
      quality: 0.8,
    });

    onScreenshotTaken(imageUri);

    setIsTakingScreenshot(false);
  }

  function handleRemoveScreenshot() {
    onScreenshotTaken(null);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? handleRemoveScreenshot : handleTakeScreenshot}
    >
      {screenshot ? (
        <View>
          <Image style={styles.screenshot} source={{ uri: screenshot }} />
          <Trash
            size={22}
            weight="fill"
            color={theme.colors.text_secondary}
            style={styles.removeIcon}
          />
        </View>
      ) : isTakingScreenshot ? (
        <ActivityIndicator color={theme.colors.text_primary} />
      ) : (
        <Camera size={24} weight="bold" color={theme.colors.text_primary} />
      )}
    </TouchableOpacity>
  );
}
