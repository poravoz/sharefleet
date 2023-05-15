import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
    constructor (private readonly apiService: ApiService) 
    {}

    @MessagePattern({ cmd: 'get-user' })
    async getUser(@Payload() userData, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        console.log(`I'am ${userData.login} and my pass is ...`)
        channel.ack(message);

        return { user: 'USER' };
    } 

    
}
