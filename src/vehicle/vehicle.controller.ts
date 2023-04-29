import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { Vehicle } from './dto/VehicleDto';
import { VehicleFilterFilter } from './filter/vehicle-filter/vehicle-filter.filter';
import { DriverFilterFilter } from '../driver/filter/driver-filter/driver-filter.filter'
import { VehicleService } from './vehicle.service';

import { DriverService } from '../driver/driver.service';
import { ResponseService } from '../response/response.service';

import { VehicleAndDriver } from '../vehicle/dto/VehicleAndDriverDto';

import { VehicleAndDriverAndResponse } from './dto/VehicleAndDriverAndResponse';
import {v4 as uuidv4 } from 'uuid';

@Controller('vehicle')
@UseFilters(new VehicleFilterFilter(), new DriverFilterFilter())
export class VehicleController {
    constructor(
      private readonly vehicleService: VehicleService, 
      private readonly driverService: DriverService,
      private readonly responseService: ResponseService,
      ) {}

  @Get('car')
  async findCar() {
    return await this.vehicleService.getVehicle();
  }

  @Get(':id')
  async findCarById(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.getVehicleById(id);
  }

  
  @Get('car/:id/driver/:driverId')
  public async findCarAndDriverById(
    @Param('id', ParseIntPipe) id: number,
    @Param('driverId', ParseIntPipe) driverId: number,
  ) {
    const [vehicle, driver] = await Promise.all([
      this.vehicleService.getVehicleById(id),
      this.driverService.getDriverById(driverId),
    ]);
    return { vehicle, driver };
  }
  
  @Get('car/driver')
  public async findAllCarsAndDrivers() {
    const [vehicles, drivers] = await Promise.all([
      this.vehicleService.getVehicle(),
      this.driverService.getDriver(),
    ]);

    const result = vehicles.map(vehicles => {
      const driver = drivers.filter(driver => driver.id === vehicles.id);
      return {  
        vehicle: {
          ...vehicles,
        },
        driver: {
          driver: driver.length ? { ...driver[0] } : null,
        },
      };
      
    })

    return result;
  }

  
  @Get('car/:id/driver/:driverId/response/:responseId')
  public async findCarAndDriverAndResponseById(
    @Param('id', ParseIntPipe) id: number, 
    @Param('driverId', ParseIntPipe) driverId : number,
    @Param('responseId', ParseIntPipe) responseId : number,
  ) {
      const [vehicle, driver, response] = await Promise.all([
          this.vehicleService.getVehicleById(id),
          this.driverService.getDriverById(driverId),
          this.responseService.getResponseById(responseId),
      ]);

      return { vehicle, driver, response};
  }
  
  
  @Get('/car/driver/response')
  public async findAllCarsAndDriversAndResponses() {
    const [vehicles, drivers, responses] = await Promise.all([
        this.vehicleService.getVehicle(),
        this.driverService.getDriver(),
        this.responseService.getResponse(),
    ]);

    const result = vehicles.map(vehicles => {
      const driver = drivers.filter(driver => driver.id === vehicles.id);
    const response = responses.filter(response => response.id === vehicles.id);

      return {
        vehicle: {
          ...vehicles,
        },
        driver: driver.length ? { ...driver[0] } : null,
        response: response.length ? { ...response[0] } : null,
      };
    })

    return result;
  }
  

  @Post()
  public async createCar(@Body() dto: Vehicle) {
    const id = uuidv4();
    return await this.vehicleService.addVehicle({...dto, id});
  }

  
  @Post('car/driver')
  public async createCarAndDriver(@Body() dto: VehicleAndDriver) {
    const { driver : dtoDriver, vehicle : dtoVehicle } = dto;
    
    const id = uuidv4();

    const [vehicle, driver] = await Promise.all([
      this.vehicleService.addVehicle({...dtoVehicle, id}),
      this.driverService.addDriver({...dtoDriver, id}),
    ])

    return { vehicle, driver};
  }
  
  
  @Post('car/driver/response')
  public async createCarAndDriverAndResponse(@Body() dto: VehicleAndDriverAndResponse) {
    const { vehicle : dtoVehicle, driver : dtoDriver, response: dtoResponse} = dto;
    const id = uuidv4();
    const[vehicle, driver, response] = await Promise.all([
      this.vehicleService.addVehicle({...dtoVehicle, id}),
      this.driverService.addDriver({...dtoDriver, id}),
      this.responseService.addResponse({...dtoResponse, id}),
    ])

    return { vehicle, driver, response};
  }
  

  @Put(':id')
  async updateCar(@Param('id') id: number, @Body() dto: Vehicle) {
    return await this.vehicleService.updateVehicle(id, dto);
  }
  
  @Put('car/:id/driver/:driverId')
  public async updateCarAndVehicle(@Param('id') id: number, @Body() dto: VehicleAndDriver) {
    const { driver: dtoDriver, vehicle: dtoVehicle} = dto;
    const [vehicle, driver] = await Promise.all([
      this.vehicleService.updateVehicle(id, dtoVehicle),
      this.driverService.updateDriver(id, dtoDriver),
    ])

    return { vehicle, driver};
  }

  @Put('car/:id/driver/:driverId/response/:responseId')
  public async updateCarAndDriverAndResponse(@Param('id') id: number, @Body() dto: VehicleAndDriverAndResponse) {
    const { driver: dtoDriver, vehicle : dtoVehicle, response: dtoResponse} = dto;
    const[vehicle, driver, response] = await Promise.all([
      this.vehicleService.updateVehicle(id, dtoVehicle),
      this.driverService.updateDriver(id, dtoDriver),
      this.responseService.updateResponse(id, dtoResponse),
    ])
    return { vehicle, driver, response};
  }
  
  @Delete(':vehicleId')
  async deleteCar(@Param('vehicleId') vehicleId: number): Promise<void> {
    return this.vehicleService.removeVehicle(vehicleId);
  }

  
  @Delete('car/:id/driver/:driverId')
  public deleteVehicleAndDriverById(@Param('id') id: number, @Param('driverId') driverId: number): void {
    this.vehicleService.removeVehicle(id);
    this.driverService.removeDriver(driverId);
  }

  
  @Delete('car/:id/driver/:driverId/response/:responseId')
  public deleteAllById(@Param('id') id: number, @Param('driverId') driverId: number, @Param('responseId') responseId: number): void {
    this.vehicleService.removeVehicle(id);
    this.driverService.removeDriver(driverId);
    this.responseService.removeResponse(responseId);
  }
  
}

