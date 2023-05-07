import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 5001,
      
    },
    
  });
  console.log('Microservices are running...');
  console.log('Application is running on: http://localhost:5000');
  await app.startAllMicroservices();
  await app.listen(5433);
}
bootstrap();