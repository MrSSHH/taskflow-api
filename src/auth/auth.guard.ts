import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    // console.log('Recieved access token: ' + token);
    if (!token) throw new UnauthorizedException('No token provided');
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      });
      request.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
