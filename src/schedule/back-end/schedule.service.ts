import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async createSchedules(createScheduleDtoArray: Schedule[]): Promise<Schedule[]> {
    const createdSchedules: Schedule[] = [];

    for (const createScheduleDto of createScheduleDtoArray) {
      const { dayOfWeek, time, subjects, teachers, classroomLinks } = createScheduleDto;

      const schedule = new Schedule();
      schedule.dayOfWeek = dayOfWeek;
      schedule.time = time;
      schedule.subjects = subjects;
      schedule.teachers = teachers;
      schedule.classroomLinks = classroomLinks;

      const createdSchedule = await this.scheduleRepository.save(schedule);
      createdSchedules.push(createdSchedule);
    }

    return createdSchedules;
  }

  async delete(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}