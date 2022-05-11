import bugImageUrl from '../img/bug.svg';
import ideaImageUrl from '../img/idea.svg';
import thoughtImageUrl from '../img/thought.svg';

import { FEEDBACK_TYPES_WITH_TITLE } from '@monorepo-shared/constants';

type FeedbackTypesWithOtherProps = {
  [key in keyof typeof FEEDBACK_TYPES_WITH_TITLE]: {
    title: string;
    imageSource: string;
    placeholder: string;
  };
};

export const FEEDBACK_TYPES: FeedbackTypesWithOtherProps = {
  BUG: {
    title: FEEDBACK_TYPES_WITH_TITLE.BUG.title,
    imageSource: bugImageUrl,
    placeholder:
      'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
  },
  IDEA: {
    title: FEEDBACK_TYPES_WITH_TITLE.IDEA.title,
    imageSource: ideaImageUrl,
    placeholder:
      'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
  },
  OTHER: {
    title: FEEDBACK_TYPES_WITH_TITLE.OTHER.title,
    imageSource: thoughtImageUrl,
    placeholder: 'Queremos te ouvir. O que você gostaria de nos dizer? ',
  },
};
