import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class DriverEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: number
    @Column({type: 'varchar', length: 15})
    public name: string
    @Column({type: 'varchar', length: 15})
    public number_phone: string
}

export default DriverEntity;