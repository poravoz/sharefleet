import { Module, forwardRef } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';

import { DriverModule } from '../driver/driver.module';
import { DriverController } from '../driver/driver.controller';
import { DriverService } from '../driver/driver.service';

import { JwtService } from '@nestjs/jwt';
import { EntityResponse } from './entities/response.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { HttpModule } from '@nestjs/axios';



@Module({
  imports:[forwardRef(() => DriverModule), TypeOrmModule.forFeature([EntityResponse]), HttpModule],
  controllers: [ResponseController, DriverController],
  providers: [ResponseService, DriverService, JwtService],
  exports: [ResponseService],
})
export class ResponseModule {}
