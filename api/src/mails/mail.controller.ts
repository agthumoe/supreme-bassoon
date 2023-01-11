import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
  Inject,
  LoggerService,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MailEntity } from './mail.entity';
import { Prisma } from '@prisma/client';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';

@Controller('mails')
@ApiTags('mails')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MailController {
  constructor(
    private readonly mailService: MailService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) { }

  @Post()
  @ApiCreatedResponse({ type: MailEntity })
  async create(@Body() dto: CreateMailDto) {
    await this.mailService.create(dto);
    this.logger.debug(
      `A new mail is in queue: ${dto.subject}, to: ${dto.toEmail}`,
    );
    return { message: 'Mail is in queue now', status: HttpStatus.CREATED };
  }

  @Get()
  @ApiOkResponse({ type: MailEntity, isArray: true })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('filter') filter?: string,
    @Query('orderBy') orderBy?: Prisma.MailOrderByWithRelationInput,
  ): Promise<PaginatedResponse<MailEntity>> {
    return this.mailService.findAll({
      skip,
      take,
      filter,
      orderBy,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: MailEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MailEntity> {
    const mail = await this.mailService.findOne(id);
    return mail ? new MailEntity(mail) : null;
  }
}
