import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class IsUserAuthorization implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const httpRequest = context.switchToHttp().getRequest();

    const userData = httpRequest.user;

    if (userData?.role === 'admin') {
      return true;
    }

    throw new UnauthorizedException('Sem permissão para essa requisição');
  }
}
