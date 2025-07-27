import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): object {
    return { status: 'ok' };
  }
}
