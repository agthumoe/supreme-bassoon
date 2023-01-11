import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await hash(data.password, await genSalt(10));

    const userCreated = await this.prisma.user.create({
      data,
    });

    return userCreated;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    select?: any;
  }): Promise<PaginatedResponse<User>> {
    const { filter, ...pagination } = params;
    let where: Prisma.UserWhereInput;
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
    const data = await this.prisma.user.findMany({
      ...pagination,
      where,
    });
    const total = await this.prisma.user.count({
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

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    // only if the password is provided, it will be updated.
    if (data.password) {
      data.password = await hash(data.password, await genSalt(10));
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
