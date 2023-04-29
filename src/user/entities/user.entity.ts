import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    public id?: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;

    @Column()
    @Exclude()
    public password: string;

    @Column({
        nullable: true,
      })
      @Exclude()
      public currentHashedRefreshToken?: string;
}

export default User;