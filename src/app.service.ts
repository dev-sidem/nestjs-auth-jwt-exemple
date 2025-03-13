import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  helloword() {
    return 'Hello word';
  }
}
