export const FEEDBACK_TYPES_WITH_TITLE = {
  BUG: {
    title: 'Problema',
  },
  IDEA: {
    title: 'Ideia',
  },
  OTHER: {
    title: 'Outro',
  },
};

export type FeedbackType = keyof typeof FEEDBACK_TYPES_WITH_TITLE;
