import { useState } from 'react';

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

import bugImageUrl from '../../img/bug.svg';
import ideaImageUrl from '../../img/idea.svg';
import thoughtImageUrl from '../../img/thought.svg';

const FEEDBACK_TYPES = {
  BUG: {
    title: 'Problema',
    imageSource: bugImageUrl,
  },
  IDEA: {
    title: 'Ideia',
    imageSource: ideaImageUrl,
  },
  OTHER: {
    title: 'Outro',
    imageSource: thoughtImageUrl,
  },
};

type FeedbackType = keyof typeof FEEDBACK_TYPES;

function WidgetForm() {
  const [selectedFeedbackType, setSelectedFeedbackType] =
    useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleFeedbackRestart() {
    setSelectedFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <div
      className="
        grid justify-items-center
        relative
        w-[calc(100vw-2rem)] sm:w-auto
        p-4 mb-4
        shadow-2xl
        rounded-2xl
        bg-white
        dark:bg-zinc-900
      "
    >
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestart={handleFeedbackRestart} />
      ) : !selectedFeedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChange={setSelectedFeedbackType} />
      ) : (
        <FeedbackContentStep
          feedbackType={selectedFeedbackType}
          onFeedbackRestart={handleFeedbackRestart}
          onFeedbackSent={handleFeedbackSent}
        />
      )}

      <footer className="text-xs text-zinc-500 dark:text-zinc-400">
        Feito com ♥ pela{' '}
        <a
          className="
            hover:text-zinc-800 focus:text-zinc-800
            dark:hover:text-zinc-100 dark:focus:text-zinc-100
            underline underline-offset-2
            transition-colors
          "
          href="https://www.rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}

export { WidgetForm, FEEDBACK_TYPES, type FeedbackType };
