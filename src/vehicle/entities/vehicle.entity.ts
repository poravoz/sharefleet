import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(({ name: 'vehicleEntity' }))
export class VehicleEntity {

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

    @Column()
    public test: string;

}

export default VehicleEntity;