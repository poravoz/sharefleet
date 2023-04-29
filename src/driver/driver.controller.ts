import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { Driver } from './dto/DriverDto';
import {DriverFilterFilter } from './filter/driver-filter/driver-filter.filter';
import { DriverService } from './driver.service';

import { ResponseService } from '../response/response.service';
import { DriverAndResponse } from './dto/DriverAndRespose';
import {v4 as uuidv4 } from 'uuid'

@Controller('drivers')
@UseFilters(new DriverFilterFilter())
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly responseService: ResponseService,
    ) {}

  @Get('driver')
  async findCar() {
    return await this.driverService.getDriver();
  }

  @Get(':id')
  async findCarById(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.getDriverById(id);
  }

  
  @Get('driver/:id/response/:responseId')
  public async findDriverAndResponseById(@Param('id', ParseIntPipe) id: number, @Param('responseId', ParseIntPipe) responseId: number) {
      const[driver, response] = await Promise.all([
          this.driverService.getDriverById(id),
          this.responseService.getResponseById(responseId),
      ]);
      return { driver, response};
  }
  
  
  @Get('driver/response')
  public async findAllDriverAndResponse() {
    const[drivers, responses] = await Promise.all([
      this.driverService.getDriver(),
      this.responseService.getResponse(),
  ]);
    
    const result = drivers.map(drivers => {
      const response = responses.filter(response => response.id === drivers.id);
      return {
          driver: {
            ...drivers,
          },
          response: {
            response: response.length ? { ...response[0] } : null,
          },
      };
    })

    return result;
  
  }  
  

  @Post()
  async createDriver(@Body() dto: Driver) {
    const id = uuidv4();
    return await this.driverService.addDriver({...dto, id});
  }

  
  @Post('driver/response')
  public async createDriverAndResponse(@Body() dto : DriverAndResponse) {
      const {driver : dtoDriver, response : dtoResponse} = dto;

      const [driver, response] = await Promise.all([
          this.driverService.addDriver(dtoDriver),
          this.responseService.addResponse(dtoResponse),
      ])

      return { driver, response};
  }
  

  @Put(':id')
  async updateDriver(@Param('id') id: number, @Body() driver: Driver) {
    return await this.driverService.updateDriver(id, driver);
  } 

  
  @Put('driver/:id/response/:responseId')
  public async updateDriverAndResponse(@Param('id') id: number, @Body() dto : DriverAndResponse) {
      const { driver: dtoDriver, response : dtoResponse} = dto;

      const[driver, response] = await Promise.all([
        this.driverService.updateDriver(id, dtoDriver),
        this.responseService.updateResponse(id, dtoResponse),
      ])

      return { driver, response};
  }
  

  @Delete('driver/:id')
  public deleteDriver(@Param('id') id: number): void {
    this.driverService.removeDriver(id);
  }

  
  @Delete('driver/:id/response/:responseId')
  public deleteAllById(@Param('id', ParseIntPipe) id: number, @Param('responseId', ParseIntPipe) responseId : number): void {
      this.driverService.removeDriver(id);
      this.responseService.removeResponse(responseId);
  }
  
}
