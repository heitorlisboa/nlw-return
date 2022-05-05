import nodemailer from 'nodemailer';
import type { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2a33dd8c95c093',
    pass: 'e3e9001db9c7d7',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Heitor Lisboa <heitor01101000@gmail.com>',
      subject,
      html: body,
    });
  }
}
