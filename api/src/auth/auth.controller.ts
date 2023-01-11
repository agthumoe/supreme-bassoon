import type { User } from '@prisma/client';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  Get,
  Post,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  BadRequestException,
} from '@nestjs/common';
import type { RequestWithUser } from './interfaces/request-with-user.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from 'src/users/user.entity';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      example: {
        username: 'admin',
        password: 'password#1',
      },
    },
  })
  @ApiCreatedResponse({ type: AuthDto })
  async login(@Request() req: Partial<RequestWithUser>): Promise<AuthDto> {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  async getProfile(
    @Request() req: RequestWithUser,
  ): Promise<Partial<User> | null> {
    return this.authService.getProfile(req.user.id);
  }

  @Post('refresh')
  @ApiBody({
    schema: {
      example: {
        refreshToken: 'admin',
      },
    },
  })
  @ApiCreatedResponse({ type: AuthDto })
  async getRefreshToken(@Body() dto: { refreshToken: string }) {
    const valid = await this.authService.verifyRefreshToken(dto.refreshToken);
    if (valid) {
      return this.authService.getNewRefreshToken(dto.refreshToken);
    }
    throw new BadRequestException('Invalid refresh token');
  }
}
