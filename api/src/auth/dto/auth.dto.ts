import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Access token with shorter expiration',
  })
  accessToken: string | null;

  @ApiProperty({
    description: 'Refresh token with longer expiration',
  })
  refreshToken?: string;
}
