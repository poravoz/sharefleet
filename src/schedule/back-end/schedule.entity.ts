import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: string;

  @Column('varchar', { array: true })
  time: string[]; // Изменение типа на массив строк

  @Column('varchar', { array: true })
  subjects: string[]; // Изменение типа на массив строк

  @Column('varchar', { array: true })
  teachers: string[]; // Изменение типа на массив строк

  @Column('varchar', { array: true })
  classroomLinks: string[]; // Изменение типа на массив строк
}