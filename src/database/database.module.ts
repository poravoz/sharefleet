import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from 'src/user/entities/user.entity';
import VehicleEntity from 'src/vehicle/entities/vehicle.entity';
import DriverEntity from 'src/driver/entities/driver.entity';
import { EntityResponse } from 'src/response/entities/response.entity';
import { VehicleAndDriverEntity } from 'src/vehicle/entities/vehicleAndDriver.entity';
import DriverAndVehicleEntity from 'src/driver/entities/driverAndVehicle.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import PublicFile from 'src/files/publicFile.entity';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => { 
         return  ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}', 
          User, 
          VehicleEntity, 
          DriverEntity, 
          EntityResponse, 
          VehicleAndDriverEntity,
          DriverAndVehicleEntity,
          DataSource,
          PublicFile,
        ],
        synchronize: true,
      })}
    }),
  ],
})
export class DatabaseModule {}