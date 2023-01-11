import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
    select?: any;
  }): Promise<PaginatedResponse<Customer>> {
    const { filter, ...pagination } = params;
    let where: Prisma.CustomerWhereInput;
    if (filter) {
      where = {
        OR: [
          {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      };
    }
    const data = await this.prisma.customer.findMany({
      ...pagination,
      where,
    });
    const total = await this.prisma.customer.count({
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

  async findOne(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUniqueOrThrow({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  async update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Customer> {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
