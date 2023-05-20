import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(({name: 'promoCodeEntity'}))
export class PromoCodeEntity {

    @PrimaryGeneratedColumn("uuid")
    public id: number;

    @Column()
    public code: string;
    
    @Column()
    public discount: string;

    @Column()
    public startDate: string;

    @Column()
    public endDate: string;

}

export default PromoCodeEntity;