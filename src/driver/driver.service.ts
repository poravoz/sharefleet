import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './dto/DriverDto';
import {DriverExeption } from './exeption/driver.exeption/driver.exeption';
import { DriverEntity} from './entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
  ) {}

 
  async getDriver() {
    return await this.driverRepository.find();
  }

  async getDriverById(id: number) {
    const driver = await this.driverRepository.findOne({ where: {id} });

    if(!driver) {
      throw new DriverExeption('Note is empty!');
    }

    return driver;
  }

  async addDriver(dto: Driver) {
    let { name, number_phone } = dto;

    if(!name || name.length === 0) {
      throw new DriverExeption('Note is empty!');
    }

    if(!number_phone || number_phone.length === 0) {
      throw new DriverExeption('Note is empty!');
    }

    const newDriver = this.driverRepository.create(dto);
    return await this.driverRepository.save(newDriver);
  }


  async updateDriver(id: number, dto: Driver) {
    const vehicle = await this.driverRepository.findOne({where: {id}});

    if(!vehicle) {
        throw new NotFoundException('Driver with ID ${id} not found');
    }

    Object.assign(vehicle, dto);
    return await this.driverRepository.save(vehicle);
  }

  async removeDriver(id: number): Promise<void> {
    const driver = await this.driverRepository.findOne({ where: {id}});
   
    if(!driver) {
      throw new DriverExeption('No note found');
    }

    await this.driverRepository.remove(driver);
  }

}


