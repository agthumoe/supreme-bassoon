import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queues } from 'src/common/constants/queue.constant';

@Processor(queues.mail)
export class MailProcessor {
  @Process()
  public async onProcess(job: Job) {
    console.log(`Processing job: ${job.id}`, job);
  }
}
