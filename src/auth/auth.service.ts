import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    // Initialize Google OAuth client
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(idToken: string) {
    try {
      // Verify and decode Google ID token
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Invalid Google token');

      const { sub, email, name, picture } = payload;

      // Find existing user or create a new one
      let user = await this.usersService.findByGoogleId(sub);
      if (!user) {
        user = await this.usersService.createUser({
          googleId: sub,
          email: email!,
          name: name!,
          picture,
          jwtRefreshToken: null,
        });
      }

      // Generate access and refresh tokens
      // Generate refresh + access tokens
      const refreshToken = this.jwtService.sign(
        { sub: user!.id, email: user!.email },
        {
          secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
          expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
        },
      );
      const accessToken = await this.generateAccessTokenUser(
        refreshToken,
        user!,
        true,
      );

      const hashedRefreshToken = await this.hashPassword(refreshToken);
      await this.usersService.updateRefreshToken(user!, hashedRefreshToken);

      // Return plain tokens to client
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Google token verification failed');
    }
  }

  async generateAccessTokenUser(
    refreshToken: string,
    user: User | null,
    firstTimeUser: boolean = false,
  ): Promise<string> {
    if (!firstTimeUser) {
      // Find user by stored refresh token
      user = await this.usersService.findByRefreshToken(refreshToken);
      console.log(
        `[AuthService] Found user for refresh token: ` +
          `id=${user?.id}, email=${user?.email}`,
      );
      if (!user) throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.jwtService.sign(
      { sub: user!.id, email: user!.email },
      {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET')!,
        expiresIn: this.config.getOrThrow<string>(
          'JWT_ACCESS_EXPIRES_IN',
        ) as any,
      },
    );
    console.log(
      `[AuthService] Issued new access token for user id=${user?.id}`,
    );
    return newAccessToken;
  }

  async hashPassword(plainPassword: string): Promise<string> {
    try {
      // Hash string using bcrypt
      return await bcrypt.hash(plainPassword, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }
}
