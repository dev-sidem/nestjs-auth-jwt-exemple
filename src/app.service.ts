import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async helloword() {
    return 'Hello word';
  }
}
