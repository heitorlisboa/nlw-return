import { type ChangeEvent, type FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';

import { api } from '../../../lib/api';

import { type FeedbackType, FEEDBACK_TYPES } from '..';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';
import { Loading } from '../../Loading';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestart: () => void;
  onFeedbackSent: () => void;
};

function FeedbackContentStep({
  feedbackType,
  onFeedbackRestart,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = FEEDBACK_TYPES[feedbackType];

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  async function handleFeedbackSubmit(event: FormEvent<HTMLFormElement>) {
    // Preventing the page from reloading
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackTypeInfo.title,
      comment: comment.trim(),
      screenshot,
    });

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          className="
            absolute top-4 left-4
            p-1
            text-zinc-500 hover:text-zinc-800
            dark:text-zinc-400 dark:hover:text-zinc-100
            transition-colors
          "
          type="button"
          onClick={onFeedbackRestart}
        >
          <ArrowLeft className="w-4 h-4" weight="bold" />
        </button>

        <span className="flex gap-2 items-center text-xl leading-6">
          <img className="w-6 h-6" src={feedbackTypeInfo.imageSource} alt="" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form
        className="grid gap-2 w-full sm:min-w-[19rem] my-4"
        onSubmit={handleFeedbackSubmit}
      >
        <label htmlFor="comment" className="sr-only">
          Comentário
        </label>
        <textarea
          id="comment"
          className="
            w-full h-40 sm:h-28
            bg-transparent
            border-2 rounded-[0.25rem]
            border-zinc-300 dark:border-zinc-600
            focus:border-brand-500 dark:focus:border-brand-500
            focus:outline-none focus:ring-0
            scrollbar scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600
            scrollbar-track-transparent scrollbar-custom
            placeholder-zinc-500 dark:placeholder-zinc-400
            resize-none
            transition-colors
          "
          placeholder={feedbackTypeInfo.placeholder}
          value={comment}
          onChange={handleTextareaChange}
        />

        <div className="flex gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />

          <button
            className="
              grid place-items-center
              bg-brand-500 hover:bg-brand-400 focus:bg-brand-400
              disabled:hover:bg-brand-500
              text-on-brand text-sm leading-6
              rounded-[0.25rem]
              disabled:opacity-50
              transition-colors
              flex-1
            "
            type="submit"
            disabled={comment.trim().length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </div>
      </form>
    </>
  );
}

export { FeedbackContentStep };
