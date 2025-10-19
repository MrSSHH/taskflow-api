import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDto } from './dto/google-login.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(idToken: string) {
    try {
      // Verify token with Google
      const ticket = await this.googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Invalid Google token');

      // Extract data from verified payload
      const { sub, email, name, picture } = payload;

      // Find or create user
      let user = await this.usersService.findByGoogleId(sub);
      if (!user) {
        user = await this.usersService.createUser({
          googleId: sub,
          email: email!,
          name: name!,
          picture,
        });
      }

      const accessToken = this.jwtService.sign({
        sub: user!.id,
        email: user!.email,
      });

      return { accessToken, user };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Google token verification failed');
    }
  }
}
