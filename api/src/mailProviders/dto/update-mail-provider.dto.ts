import { PartialType } from '@nestjs/swagger';
import { CreateMailProviderDto } from './create-mail-provider.dto';

export class UpdateMailProviderDto extends PartialType(CreateMailProviderDto) {}
