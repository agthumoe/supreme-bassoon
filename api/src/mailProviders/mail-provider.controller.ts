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
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { CreateMailProviderDto } from './dto/create-mail-provider.dto';
import { MailProviderEntity } from './mail-provider.entity';
import { MailProviderService } from './mail-provider.service';
import { UpdateMailProviderDto } from './dto/update-mail-provider.dto';

@Controller('providers')
@ApiTags('providers')
@ApiBearerAuth('jwt')
@UseInterceptors(ClassSerializerInterceptor)
export class MailProviderController {
  constructor(
    private readonly mailProviderService: MailProviderService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) { }

  @Post()
  @ApiCreatedResponse({ type: MailProviderEntity })
  async create(
    @Body() dto: CreateMailProviderDto,
  ): Promise<MailProviderEntity> {
    const mailProvider = await this.mailProviderService.create(dto);
    this.logger.debug(`A new mailProvider is created: ${mailProvider.name}`);
    return new MailProviderEntity(mailProvider);
  }

  @Get()
  @ApiOkResponse({ type: MailProviderEntity, isArray: true })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('filter') filter?: string,
    @Query('orderBy') orderBy?: Prisma.CustomerOrderByWithRelationInput,
  ): Promise<PaginatedResponse<MailProviderEntity>> {
    return this.mailProviderService.findAll({
      skip,
      take,
      filter,
      orderBy,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: MailProviderEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MailProviderEntity> {
    const mailProvider = await this.mailProviderService.findOne(id);
    return mailProvider ? new MailProviderEntity(mailProvider) : null;
  }

  @Put(':id')
  @ApiOkResponse({ type: MailProviderEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMailProviderDto,
  ): Promise<MailProviderEntity> {
    const mailProvider = await this.mailProviderService.update(id, dto);
    this.logger.debug(
      `The mailProvider with id: ${mailProvider.id}, is updated`,
    );
    return new MailProviderEntity(mailProvider);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.mailProviderService.remove(id);
    this.logger.debug(`The mailProvider with id: ${id}, is deleted.`);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
