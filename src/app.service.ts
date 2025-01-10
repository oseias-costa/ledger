import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User from google',
      user: req.user,
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
