import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [ApiController],
  providers: [],
})
export class AppModule {}
