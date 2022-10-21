import {
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// This way allows to keep controllers clean and only busy with a logic to the requests.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(
    @Body() dto: AuthDto,
    @Req() req: Request,
  ) {
    req.user;
    return this.authService.signin(dto);
  }
}
