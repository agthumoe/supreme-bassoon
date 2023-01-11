export interface MailState {
  data: MailDto[];
  find: (filter?: string) => Promise<MailDto[]>;
  create: (dto: CreateMailDto) => Promise<MailDto>
}

export interface MailDto {
  id: number;
  status: string;
  mailUuid: string;
  retriedCount: number;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
  subject: string;
  body: string;
}

export interface CreateMailDto {
  toName: string;
  toEmail: string;
  subject: string;
  body: string;
}