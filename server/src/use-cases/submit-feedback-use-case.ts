import {
  FEEDBACK_TYPES_WITH_TITLE,
  type FeedbackType,
} from '@monorepo-shared/constants';
import { HttpError } from '../errors/http-error';
import type { FeedbacksRepository } from '../repositories/feedbacks-repository';
import type { MailAdapter } from '../adapters/mail-adapter';

type SubmitFeedbackUseCaseRequest = {
  type: string;
  comment: string;
  screenshot?: string;
};

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new HttpError({
        status: 400,
        message: 'O tipo do feedback é obrigatório.',
      });
    }

    const FEEDBACK_TYPES = Object.keys(FEEDBACK_TYPES_WITH_TITLE);
    const invalidType = !FEEDBACK_TYPES.includes(type);
    if (invalidType) {
      throw new HttpError({
        status: 400,
        message: [
          'Tipo de feedback inválido.',
          `Os tipos válidos são: ${FEEDBACK_TYPES}.`,
        ].join('\n'),
      });
    }

    if (!comment) {
      throw new HttpError({
        status: 400,
        message: 'O comentário do feedback é obrigatório.',
      });
    }

    const invalidScreenshotFormat =
      screenshot && !screenshot.startsWith('data:image/png;base64,');
    if (invalidScreenshotFormat) {
      const tmp = new HttpError({
        status: 400,
        message: 'Formato da captura de tela inválido.',
      });
      throw tmp;
    }

    try {
      await this.feedbacksRepository.create({
        type,
        comment,
        screenshot,
      });
    } catch (error) {
      throw new HttpError({
        status: 500,
        message: 'Erro ao criar o feedback em nosso banco de dados.',
      });
    }

    try {
      await this.mailAdapter.sendMail({
        subject: 'Novo feedback',
        body: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `  <p>Tipo do feedback: ${
            FEEDBACK_TYPES_WITH_TITLE[type as FeedbackType].title
          }</p>`,
          `  <p>Comentário: ${comment}</p>`,
          screenshot ? `  <img src="${screenshot}" />` : null,
          `</div>`,
        ]
          .filter(Boolean)
          .join('\n'),
      });
    } catch (error) {
      throw new HttpError({
        status: 500,
        message: 'Erro ao enviar o feedback ao nosso time.',
      });
    }
  }
}
