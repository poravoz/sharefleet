import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';

import { DriverModule } from './driver/driver.module'
import { DriverController } from './driver/driver.controller';
import { DriverService} from './driver/driver.service';

import { ResponseModule } from './response/response.module'
import { ResponseController } from './response/response.controller'
import { ResponseService } from './response/response.service'
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi";

import { DatabaseModule } from 'src/database/database.module';

import { UserModule } from './user/user.module';
import { AuthModule} from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesModule } from './files/files.module';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';


@Module({
  imports: [VehicleModule, DriverModule, ResponseModule, HttpModule, UserModule, 
    MulterModule.register({
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
    }),

    ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
      JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
      JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      synchronize: false,
      AWS_REGION: Joi.string().required(),
      AWS_ACCESS_KEY_ID: Joi.string().required(),
      AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      PORT: Joi.number(),
    })
  }), 
  DatabaseModule,
  UserModule,
  AuthModule,
  DriverModule,
  ResponseModule,
  VehicleModule,
  VehicleModule,
  FilesModule,

],
  controllers: [AppController, VehicleController, DriverController, ResponseController, FilesController],
  providers: [AppService, DriverService, VehicleService, ResponseService],
})
export class AppModule {}
