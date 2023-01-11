import type { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  apiSecret: string;

  constructor(
    @Inject(Logger) private logger: LoggerService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Retrieve a user and verify the password
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      return new UserEntity(user);
    }

    return new UserEntity(user);
  }

  async login(user: Partial<User>): Promise<AuthDto> {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async getProfile(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(id);
    return new UserEntity(user);
  }

  async verifyRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.secret,
      });

      return true;
    } catch (error) {
      this.logger.error(error, AuthService.name);
      return false;
    }
  }

  async getNewRefreshToken(refreshToken: string): Promise<AuthDto> {
    const { email, sub } = this.jwtService.decode(refreshToken, {
      json: true,
    }) as {
      email: string;
      sub: number;
      iat: Date;
      exp: Date;
    };
    return {
      accessToken: this.jwtService.sign({ email, sub }),
      refreshToken: this.jwtService.sign({ email, sub }, { expiresIn: '30d' }),
    };
  }
}
