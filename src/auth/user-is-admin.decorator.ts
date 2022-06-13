import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const UserIsAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user.isAdmin) {
    throw new UnauthorizedException('Somente admins podem acessar essa rota');
  }
  return user;
});
