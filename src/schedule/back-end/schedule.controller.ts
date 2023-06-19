import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Post()
  async createSchedules(@Body() createScheduleDtoArray: Schedule[]): Promise<Schedule[]> {
    return this.scheduleService.createSchedules(createScheduleDtoArray);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.scheduleService.delete(id);
  }
}