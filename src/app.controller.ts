import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('app')
export class AppController {
    constructor(
        @Inject('AUTH_SERVICE') private authService: ClientProxy
    ) {}

    @Get('user')
    async getUser() {
        let response = this.authService.send({cmd: 'get-user'}, {
            login: "mykola",
            password: "123"
        });

        return response;
    }
}
