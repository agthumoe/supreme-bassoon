import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  HttpStatus,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  DefaultValuePipe,
  ClassSerializerInterceptor,
  Logger,
  Inject,
  LoggerService,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Response } from 'express';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);
    this.logger.debug(`A new user is created: ${user.email}`);
    return new UserEntity(user);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('filter') filter?: string,
    @Query('orderBy') orderBy?: Prisma.UserOrderByWithRelationInput,
  ): Promise<PaginatedResponse<UserEntity>> {
    return this.userService.findAll({
      skip,
      take,
      filter,
      orderBy,
      select: {
        id: true,
        email: true,
        name: true,
        createdBy: true,
        createdAt: true,
        updatedBy: true,
        updatedAt: true,
      },
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);
    return user ? new UserEntity(user) : null;
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.update(id, updateUserDto);
    this.logger.debug(`The user with id: ${user.id}, is updated`);
    return new UserEntity(user);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.userService.remove(id);
    this.logger.debug(`The user with id: ${id}, is deleted.`);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
