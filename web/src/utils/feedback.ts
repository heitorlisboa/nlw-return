import bugImageUrl from '../img/bug.svg';
import ideaImageUrl from '../img/idea.svg';
import thoughtImageUrl from '../img/thought.svg';

export const FEEDBACK_TYPES = {
  BUG: {
    title: 'Problema',
    imageSource: bugImageUrl,
    placeholder:
      'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
  },
  IDEA: {
    title: 'Ideia',
    imageSource: ideaImageUrl,
    placeholder:
      'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
  },
  OTHER: {
    title: 'Outro',
    imageSource: thoughtImageUrl,
    placeholder: 'Queremos te ouvir. O que você gostaria de nos dizer? ',
  },
};

export type FeedbackType = keyof typeof FEEDBACK_TYPES;
