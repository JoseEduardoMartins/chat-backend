import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.token || req.cookies.token;

      const {
        baseUrl,
        route: { path },
        method,
        params,
      } = req;

      const hasEndBar = Boolean(path.substring(path.length - 1) === '/');
      const hasParameters = Boolean(Object.keys(params).length);
      const newRoute = !hasEndBar && !hasParameters ? path + '/' : path;

      console.log({
        token,
        baseUrl,
        route: newRoute,
        method,
      });

      const decoded = await this.jwtService.decode(token);
      if (!Object.keys(decoded).length) throw new Error('Invalid token.');

      next();
    } catch (error) {
      throw new BadRequestException({
        message: 'Token must be provided for this request',
        token: 'TOKEN_NOT_PROVIDED',
      });
    }
  }
}
