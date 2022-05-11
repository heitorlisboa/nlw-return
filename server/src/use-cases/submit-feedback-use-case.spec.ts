import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback with screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,exampleScreenshot',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it('should be able to submit a feedback without screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'example comment',
      })
    ).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,exampleScreenshot',
      })
    ).rejects.toThrow(/tipo/i);
  });

  it('should not be able to submit a feedback with an invalid type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'TEST',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,exampleScreenshot',
      })
    ).rejects.toThrow(/inválido/i);
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,exampleScreenshot',
      })
    ).rejects.toThrow(/comentário/i);
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.png',
      })
    ).rejects.toThrow(/(tela|print)/i);
  });

  it('should throw when the database insertion fails', async () => {
    const submitFeedbackUseCaseWithEmailError = new SubmitFeedbackUseCase(
      {
        create: () => {
          throw new Error('');
        },
      },
      { sendMail: jest.fn() }
    );

    await expect(
      submitFeedbackUseCaseWithEmailError.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,exampleScreenshot',
      })
    ).rejects.toThrow(/banco de dados/i);
  });

  it('should throw when the email service fails', async () => {
    const submitFeedbackUseCaseWithEmailError = new SubmitFeedbackUseCase(
      { create: jest.fn() },
      {
        sendMail: () => {
          throw new Error('');
        },
      }
    );

    await expect(
      submitFeedbackUseCaseWithEmailError.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,exampleScreenshot',
      })
    ).rejects.toThrow(/enviar/i);
  });
});
