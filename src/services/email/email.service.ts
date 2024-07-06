import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    const data = {
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      secure: this.configService.get<boolean>('email.secure'), // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.password'),
      },
      service: 'gmail',
      tls: {
        rejectUnauthorized: false,
      },
    };
    this.transporter = nodemailer.createTransport(data);
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"No Reply" <${this.configService.get<string>('email.from')}>`,
      to,
      subject,
      text,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
