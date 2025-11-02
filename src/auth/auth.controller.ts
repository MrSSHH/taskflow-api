import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('google')
  async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return this.authService.verifyGoogleToken(googleLoginDto.idToken);
  }
  @Post('refresh-token')
  async refreshToken(@Req() req) {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader?.split(' ')[1];
    console.log('Refresh token received:', refreshToken);
    const accessToken = await this.authService.generateAccessTokenUser(
      refreshToken,
      null,
    );
    return accessToken;
  }
}
