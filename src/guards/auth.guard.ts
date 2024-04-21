import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    let bearerToken = request.headers.authorization;
    bearerToken = bearerToken.replace('Bearer ', '');

    const response: any = await fetch(
      `http://localhost:3001/introspection/${bearerToken}`,
    );
    const data = await response.json();

    request.user = data;

    if (data.admin === true) {
      return true;
    } else {
      return false;
    }
  }
}
