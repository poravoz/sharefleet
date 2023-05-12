import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
    constructor (private readonly apiService: ApiService) 
    {}

    @MessagePattern({ cmd: 'get-user' })
    async getUser(@Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        channel.ack(message);

        return { user: 'USER' };
    } 

    
}
