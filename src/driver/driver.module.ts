import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

import { VehicleController } from '../vehicle/vehicle.controller';
import { VehicleService } from '../vehicle/vehicle.service';

import { ResponseController } from '../response/response.controller';
import { ResponseService } from '../response/response.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './entities/driver.entity';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { ResponseModule } from 'src/response/response.module';
import VehicleEntity from 'src/vehicle/entities/vehicle.entity';
import { EntityResponse } from 'src/response/entities/response.entity';
import { HttpModule } from '@nestjs/axios';
 
@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity, VehicleEntity, EntityResponse]), HttpModule],
  controllers: [DriverController, VehicleController, ResponseController],
  providers: [DriverService, VehicleService, ResponseService],
  exports: [DriverService, TypeOrmModule, DriverService, VehicleService],
})
export class DriverModule {}
