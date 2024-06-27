import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { generateRandomText } from 'src/common/helpers/string';
import { domainFormatter } from '../../common/helpers/domain-formater';
import { MailService } from '../mails/mail.service';
import { UsersService } from '../users/users.service';
import { ConfirmAuthDto } from './dto/confirm-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({
    description: 'Autenticar de usuario.',
    tags: ['Auth'],
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<any> {
    const { email, password } = loginAuthDto;

    const [user] = await this.usersService.find({
      where: { email },
    });

    if (!user) throw new UnauthorizedException(['Invalid email or password']);

    if (user?.password !== password)
      throw new UnauthorizedException(['Invalid email or password']);

    if (!user.isActived)
      throw new UnauthorizedException(['User is not active, check your email']);

    if (!user.isVerified)
      throw new UnauthorizedException([
        'User is not verified, check your email',
      ]);

    if (user.isDeleted)
      throw new UnauthorizedException(['User is deleted, check your email']);

    const token = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const domain = domainFormatter(request.get('origin'));

    response.cookie('token', token, {
      httpOnly: true,
      secure: domain !== 'localhost',
      domain,
    });

    delete user.password;
    delete user.securityCode;
    delete user.isActived;
    delete user.isVerified;
    delete user.isDeleted;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.deletedAt;

    return {
      token,
      user,
    };
  }

  @ApiOperation({
    description: 'Registrar usuario.',
    tags: ['Auth'],
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const securityCode = generateRandomText(6, '123456789');

    const response = await this.usersService.create({
      ...registerAuthDto,
      securityCode,
    });

    this.mailService.sendMail({
      to: registerAuthDto.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name: registerAuthDto.name,
        securityCode,
      },
    });

    return response;
  }

  @ApiOperation({
    description: 'Confirmar email de usuario.',
    tags: ['Auth'],
  })
  @Post('confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirm(@Body() confirmAuthDto: ConfirmAuthDto) {
    const { email, securityCode } = confirmAuthDto;

    const [user] = await this.usersService.find({
      select: ['id', 'securityCode'],
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid email');

    if (user?.securityCode !== securityCode)
      throw new UnauthorizedException('Invalid code');

    await this.usersService.update(user.id, {
      securityCode: null,
      isVerified: true,
    });
  }
}
