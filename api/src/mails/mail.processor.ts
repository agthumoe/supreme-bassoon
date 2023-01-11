import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queues } from 'src/common/constants/queue.constant';
import { PrismaService } from 'src/common/prisma/prisma.service';
import QueueMailDto from './dto/queue-mail.dto';
import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Processor(queues.mail)
export class MailProcessor {
  constructor(private prisma: PrismaService, private logger: Logger) { }
  @Process()
  public async onProcess(job: Job) {
    this.logger.debug(`Processing job: ${job.id}`);
    try {
      const { providers, data }: QueueMailDto = job.data;
      const provider = providers.shift();
      // save in the data.
      try {
        // initialize transporter.
        const transporter = nodemailer.createTransport({
          service: provider.name,
          host: provider.host,
          port: provider.port,
          secure: provider.secure,
          auth: {
            user: provider.username,
            pass: provider.password,
          },
        });
        // send email
        const info = await transporter.sendMail({
          from: `"${provider.name}" <${provider.username}>`,
          to: `"${data.toName}" <${data.toEmail}>`,
          subject: data.subject,
          html: data.body,
        });
        const mail = await this.prisma.mail.create({
          data: {
            ...data,
            fromName: provider.name,
            fromEmail: provider.username,
            status: info.accepted.length > 0 ? 'success' : 'fail',
          },
        });
        this.logger.debug(
          `mail is created in db: fromName: ${mail.fromName}, fromEmail: ${mail.fromEmail}, retryCount: ${data.retriedCount}`,
        );
        // process the job here.
      } catch (error) {
        this.logger.debug('there is an error and we are going to retry.');
        job.update({
          providers,
          data: { ...data, retriedCount: data.retriedCount + 1 },
        });
        job.releaseLock();
      }
    } catch (error) {
      this.logger.error('error processing mail queue', error);
      job.releaseLock();
    }
  }
}
