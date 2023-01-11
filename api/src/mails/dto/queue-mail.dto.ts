import { MailProvider, Prisma } from '@prisma/client';

export default interface QueueMailDto {
  providers: MailProvider[];
  data: Prisma.MailCreateInput;
}
