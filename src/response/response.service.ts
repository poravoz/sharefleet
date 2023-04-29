import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'crypto';
import { Repository } from 'typeorm';
import { Response } from './dto/responseDto';
import { EntityResponse } from './entities/response.entity';
import {ResponseExeption } from './exeption/driver.exeption/response.exeption';

@Injectable()
export class ResponseService {

  constructor(
    @InjectRepository(EntityResponse)
    private responseRepository: Repository<EntityResponse>,
  ) {}

  async getResponse() {
    return await this.responseRepository.find();
  }

  async getResponseById(id: number) {
    const response = await this.responseRepository.findOne({where: {id}});

    if(!response) {
      throw new ResponseExeption('Note is empty!');
    }

    return response;
  }

  async addResponse(dto: Response) {
    let { name, response} = dto;

    if(!name || name.length === 0) {
      throw new ResponseExeption('Note is empty!');
    }

    if(!response || response.length === 0) {
      throw new ResponseExeption('Note is empty!');
    }

    const newResponse = this.responseRepository.create(dto);
    return await this.responseRepository.save(newResponse);
  }

  
  async updateResponse(id: number, newResponse: Response) {
    const response = await this.responseRepository.findOne({where: {id}});

    if(!response) {
      throw new ResponseExeption("Response with ID ${id} not found");
    }

    Object.assign(response, newResponse);
    return await this.responseRepository.save(response);
  }
  

  async removeResponse(id: number): Promise<void> {
    const response = await this.responseRepository.findOne({where: {id}});
   
    if(!response) {
      throw new ResponseExeption('No note found');
    }

    await this.responseRepository.remove(response);
  }

}


