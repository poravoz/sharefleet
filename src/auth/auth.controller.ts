import { Controller, Post, Body, HttpCode, Req, UseGuards, Res, Get, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { LocalAuthGuard } from './jwt-strategy/localAuth.guard';
import { AuthService } from './auth.service';
import RequestWithUser from './interfaces/requestWithUser.interface';
import RegisterDto from './dto/register.dto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import JwtRefreshGuard from './refresh-token/jwt-refresh.guard';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto, @Res() response: Response) {
    const { password, confirmPassword } = registrationData;
    const passwordsMatch = await this.authService.validatePassword(password, confirmPassword);

    if (!passwordsMatch) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.authService.register({...registrationData, id: uuidv4()});
    createdUser.password = null;

    const cookie = this.authService.getCookieWithJwtToken(createdUser.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(createdUser);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {

    const {user} = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    
    const { cookie: refreshTokenCookie, token: refreshToken} = 
    this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
 
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);
 
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

@UseGuards(LocalAuthGuard)
  @Get('logout')
  async logOut(@Req() request: RequestWithUser) {
    if (request.user) {
      await this.userService.removeRefreshToken(request.user.id);
      request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    } else {
      throw new UnauthorizedException();
    }
  }


}
