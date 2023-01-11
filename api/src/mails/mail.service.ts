import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Mail, Prisma } from '@prisma/client';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { v4 as uuid } from 'uuid';
import QueueMailDto from './dto/queue-mail.dto';
import { queues } from 'src/common/constants/queue.constant';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(queues.mail) private mailQueue: Queue,
    private prisma: PrismaService,
  ) { }
  async create(data: CreateMailDto): Promise<void> {
    const input = { ...data } as Prisma.MailCreateInput;
    input.mailUuid = uuid();
    // initial retried count is 1.
    input.retriedCount = 1;
    // get the provider
    const providers = await this.prisma.mailProvider.findMany({
      orderBy: {
        searchIndex: 'desc',
      },
    });
    // add in the queue for further processing.
    this.mailQueue.add({ data: input, providers } as QueueMailDto);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    orderBy?: Prisma.MailOrderByWithRelationInput;
    select?: any;
  }): Promise<PaginatedResponse<Mail>> {
    const { filter, ...pagination } = params;
    let where: Prisma.MailWhereInput;
    if (filter) {
      where = {
        OR: [
          {
            fromName: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            fromEmail: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            toName: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            toEmail: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            subject: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      };
    }
    const data = await this.prisma.mail.findMany({
      ...pagination,
      where,
    });
    const total = await this.prisma.mail.count({
      where,
    });
    return {
      data,
      meta: {
        current: params.skip / params.take,
        total,
        pageSize: params.take,
      },
    };
  }

  async findOne(id: number): Promise<Mail | null> {
    return this.prisma.mail.findUniqueOrThrow({
      where: { id },
    });
  }
}
