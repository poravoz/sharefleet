import { Injectable, Param } from "@nestjs/common";
import { Repository } from "typeorm";
import { PromoCode } from "./dto/promo.dto";
import { PromoCodeExeption } from "./exeprion/promo.exeprion";
import { InjectRepository } from '@nestjs/typeorm';
import PromoCodeEntity from "./entity/promo.entity";

@Injectable()
export class PromoCodeService {
    constructor(
        @InjectRepository(PromoCodeEntity)
        private promoCodeRepository: Repository<PromoCodeEntity>
    ) {}

    async getPromoCode() {
        return await this.promoCodeRepository.find();
    }

    async getPromoCodeById(id: number) {
        const promoCode = await this.promoCodeRepository.findOne({
            where: {id}
        });

        if(!promoCode) {
            throw new PromoCodeExeption('Note is empty');
        }

        return promoCode;
    }

    async addPromoCode(dto: PromoCode) {
        let { code, discount, startDate, endDate } = dto;

        if(!code || code.length === 0) {
            throw new PromoCodeExeption('Note is empty');
        }
        
        if(!discount || discount.length === 0) {
            throw new PromoCodeExeption('Note is empty');
        }

        if(!startDate || startDate.length === 0) {
            throw new PromoCodeExeption('Note is empty');
        }

        if(!endDate || endDate.length === 0) {
            throw new PromoCodeExeption('Note is empty');
        }

        const newPromoCode = this.promoCodeRepository.create(dto);
        return await this.promoCodeRepository.save(newPromoCode);

    }

    async deletePromoCode(@Param('id') id: number): Promise<void> {
        const promoCode = await this.promoCodeRepository.findOne({where: {id}});

        if(!promoCode) {
            throw new PromoCodeExeption('Note is empty');
        }
        
        await this.promoCodeRepository.remove(promoCode);
    }
}