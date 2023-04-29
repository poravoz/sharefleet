import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntityResponse {

    @PrimaryGeneratedColumn("uuid")
    public id: number

    @Column()
    public name: string

    @Column()
    public response: string
}

export default Response;