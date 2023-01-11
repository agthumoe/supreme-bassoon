import { Injectable } from '@nestjs/common';
import { MailProvider, Prisma } from '@prisma/client';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateMailProviderDto } from './dto/update-mail-provider.dto';

@Injectable()
export class MailProviderService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MailProviderCreateInput): Promise<MailProvider> {
    return this.prisma.mailProvider.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    orderBy?: Prisma.MailProviderOrderByWithRelationInput;
    select?: any;
  }): Promise<PaginatedResponse<MailProvider>> {
    const { filter, ...pagination } = params;
    let where: Prisma.MailProviderWhereInput;
    if (filter) {
      where = {
        OR: [
          {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      };
    }
    const data = await this.prisma.mailProvider.findMany({
      ...pagination,
      where,
    });
    const total = await this.prisma.mailProvider.count({
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

  async findOne(id: number): Promise<MailProvider | null> {
    return this.prisma.mailProvider.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, data: UpdateMailProviderDto): Promise<MailProvider> {
    return this.prisma.mailProvider.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<MailProvider> {
    return this.prisma.mailProvider.delete({
      where: { id },
    });
  }
}
