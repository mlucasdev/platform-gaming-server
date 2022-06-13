import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class LoginRespondeDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Im5leW1hcmpyNSIsImlhdCI6MTY1NTA2ODg5NiwiZXhwIjoxNjU1MTU1Mjk2fQ.oO79XVy2DhfaGN3a2QkogoRHlS9Z4yw1ak0F2hKMYhA',
  })
  token: string;

  @ApiProperty({
    description: 'Dados du usuário que realizou o login',
  })
  user: User;
}
