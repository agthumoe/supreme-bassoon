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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './customer.entity';
import { Response } from 'express';
import PaginatedResponse from 'src/common/dtos/paginated-response.dto';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@ApiTags('customers')
@ApiBearerAuth('jwt')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CustomerEntity })
  async create(@Body() dto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = await this.customerService.create(dto);
    this.logger.debug(`A new customer is created: ${customer.email}`);
    return new CustomerEntity(customer);
  }

  @Get()
  @ApiOkResponse({ type: CustomerEntity, isArray: true })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('filter') filter?: string,
    @Query('orderBy') orderBy?: Prisma.CustomerOrderByWithRelationInput,
  ): Promise<PaginatedResponse<CustomerEntity>> {
    return this.customerService.findAll({
      skip,
      take,
      filter,
      orderBy,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomerEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CustomerEntity> {
    const customer = await this.customerService.findOne(id);
    return customer ? new CustomerEntity(customer) : null;
  }

  @Put(':id')
  @ApiOkResponse({ type: CustomerEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.customerService.update(id, updateCustomerDto);
    this.logger.debug(`The customer with id: ${customer.id}, is updated`);
    return new CustomerEntity(customer);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.customerService.remove(id);
    this.logger.debug(`The customer with id: ${id}, is deleted.`);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
