import VehicleEntity from 'src/vehicle/entities/vehicle.entity';
import VehicleAndDriverEntity from 'src/vehicle/entities/vehicleAndDriver.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import DriverEntity from './driver.entity';


@Entity()
export class DriverAndVehicleEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: number
    @Column({type: 'varchar', length: 15})
    public name: string
    @Column({type: 'varchar', length: 15})
    public number_phone: string

    @OneToMany(() => VehicleAndDriverEntity, (vehicle: VehicleAndDriverEntity) => vehicle.vehicle)
    public driver: DriverEntity[];
}

export default DriverAndVehicleEntity;