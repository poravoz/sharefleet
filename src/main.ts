import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import { ExcludeNullInterceptor } from './units/excludeNull.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
  });

  const amqp = require("amqplib");
  async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("number");
    channel.consume("number", message => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received number: ${input.number}`);
      channel.ack(message);
    });
    console.log(`Waiting for messages...`);
  } catch (ex) {
    console.error(ex);
  }
}
connect();

  app.startAllMicroservices();
  await app.listen(5433);
}
bootstrap();
