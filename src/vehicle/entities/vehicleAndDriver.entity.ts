import DriverAndVehicleEntity from 'src/driver/entities/driverAndVehicle.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import DriverEntity from '../../driver/entities/driver.entity';

@Entity()
export class VehicleAndDriverEntity {

    @PrimaryGeneratedColumn("uuid")
    public id?: number;

    @Column()
    public content : string;

    @Column()
    public status : string;

    @Column()
    public number_agency : string;

    @Column()
    public number_car : string;

    @Column()
    public price: string;

    @OneToOne(() => DriverAndVehicleEntity, (driver: DriverAndVehicleEntity) => driver.driver, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    public vehicle: VehicleAndDriverEntity;
}
export default VehicleAndDriverEntity;