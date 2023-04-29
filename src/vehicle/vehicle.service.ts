import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DriverEntity from 'src/driver/entities/driver.entity';
import { Repository } from 'typeorm';
import { Vehicle } from './dto/VehicleDto';
import VehicleEntity from './entities/vehicle.entity';
import { VehicleExeption } from './exeption/vehicle.exeption/vehicle.exeption';


@Injectable()
export class VehicleService {
    
    constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>
    ) {}
    
    
    async getVehicle() {
      return await this.vehicleRepository.find();
  }

    async getVehicleById(id: number) {
      const vehicle = await this.vehicleRepository.findOne( { where: {id}});

      if(!vehicle) {
        throw new VehicleExeption('Note is empty!');
      }

      return vehicle;
    }
  
    async addVehicle(dto : Vehicle) {

      let { content, status, number_agency, number_car, price} = dto;

      if(!content || content.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }

      if(!status || status.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }

      if(!number_agency || number_agency.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }

      if(!number_car || number_car.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }
      if(!price || price.length === 0) {
        throw new VehicleExeption('Note is empty!');
      }
  
      const newVehicle = this.vehicleRepository.create(dto);
      return await this.vehicleRepository.save(newVehicle);
  
      
    }
  
    async removeVehicle(id: number): Promise<void> {
      const vehicle = await this.vehicleRepository.findOne({where: {id}});
      
      if(!vehicle) {
        throw new VehicleExeption("No note found");
      }

      await this.vehicleRepository.remove(vehicle);
    }
  

    async updateVehicle(id: number, dto: Vehicle) {
      const vehicle = await this.vehicleRepository.findOne({where: {id}});

      if(!vehicle) {
        throw new VehicleExeption('Vehicle with ID ${id} not found');
      }
        Object.assign(vehicle, dto);
        return await this.vehicleRepository.save(vehicle);
    }



    
    getHello(): string {
      return 'Hello World!';
    }

}
