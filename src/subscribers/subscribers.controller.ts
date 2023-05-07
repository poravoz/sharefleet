import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import CreateSubscriberDto from './dto/createSubscriber.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(
    private readonly subscribersService: SubscribersService,
  ) {}

  @MessagePattern({ cmd: 'add-subscriber' })
  async addSubscriber(@Payload() subscriber: CreateSubscriberDto) {
    try {
      const result = await this.subscribersService.addSubscriber(subscriber);
      console.log('Subscriber added:', result);
      return result;
    } catch (error) {
      console.log('Failed to add subscriber:', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get-all-subscribers' })
  getAllSubscribers() {
    return this.subscribersService.getAllSubscribers();
  }
}