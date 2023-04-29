import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { Response } from './dto/responseDto';
import {ResponseFilterFilter } from './filter/driver-filter/response-filter.filter';
import { ResponseService } from './response.service';
import {v4 as uuidv4 } from 'uuid';
import { HttpService } from '@nestjs/axios';

@Controller('response')
@UseFilters(new ResponseFilterFilter())
export class ResponseController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly httpService: HttpService,
    ) {}

  @Get()
  async findResponse() {
    return await this.responseService.getResponse();
  }

  @Get('webhook')
  async findResponseWebhook() {
    const getResponse = await this.responseService.getResponse();
    await this.httpService
      .get('https://webhook.site/5a4458ac-add8-463b-bd93-db69a6cc7e12')
      .subscribe({
        complete: () => console.log("complete")
      })
      return getResponse;
  }

  @Get(':id')
  async findResponseById(@Param('id') id: number) {
    return await this.responseService.getResponseById(id);
  }

  @Get('webhook/:id')
  async findResponseByIdWebhook(@Param('id') id: number) {
    const getResponse = await this.responseService.getResponseById(id);
    this.httpService
      .get('https://webhook.site/5a4458ac-add8-463b-bd93-db69a6cc7e12')
      .subscribe({
        complete: () => console.log("complete")
      })
      return getResponse;
  }

  @Post()
  async createResponse(@Body() dto: Response) {
    const id = uuidv4();
    return await this.responseService.addResponse({...dto, id});
  }

  @Post('webhook')
  async createResponseWebhook(@Body() data) {
    const id = uuidv4();
    const createResponse = await this.responseService.addResponse({...data, id});

    this.httpService
      .post('https://webhook.site/5a4458ac-add8-463b-bd93-db69a6cc7e12', data)
      .subscribe({
        complete: () => console.log("complete")
      })
      return createResponse;
  }

  @Delete(':id')
  async deleteResponse(@Param('id') id: number): Promise<void> {
    return await this.responseService.removeResponse(id);
  }

  @Delete('webhook/:id')
  async deleteResponseWebhook(@Param('id') id: number): Promise<void> {
    await this.responseService.removeResponse(id);
    await this.httpService
    .delete('https://webhook.site/5a4458ac-add8-463b-bd93-db69a6cc7e12')
    .subscribe({
      complete: () => console.log("complete")
    })
  }

  @Put(':id')
  async updateResponse(@Param('id') id: number, @Body() response: Response) {
    return await this.responseService.updateResponse(id, response);
  } 

  @Put('webhook/:id')
  async updateResponseWebhook(@Param('id') id: number, @Body() response: Response) {
    await this.httpService
    .put('https://webhook.site/5a4458ac-add8-463b-bd93-db69a6cc7e12', response)
    .subscribe({
      complete: () => console.log("complete")
    })
    return await this.responseService.updateResponse(id, response);
  } 

}
