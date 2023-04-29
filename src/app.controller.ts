import { Controller } from '@nestjs/common';

@Controller('api')
export class AppController {

  getHello() {
    return "Hello";
  }
  
}

