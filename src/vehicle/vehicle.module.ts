import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

import { DriverService } from '../driver/driver.service';
import { DriverController } from '../driver/driver.controller';

import { ResponseService } from '../response/response.service';
import { ResponseController } from '../response/response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import VehicleEntity from './entities/vehicle.entity';

import DriverEntity from 'src/driver/entities/driver.entity';
import { EntityResponse } from '../response/entities/response.entity';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports:[TypeOrmModule.forFeature([VehicleEntity, DriverEntity, EntityResponse]), HttpModule],
  controllers: [VehicleController, DriverController, ResponseController],
  providers: [VehicleService, DriverService, ResponseService],
  exports:[VehicleService, TypeOrmModule],  
})

export class VehicleModule {}
