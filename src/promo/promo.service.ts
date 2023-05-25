import { Injectable, Param } from "@nestjs/common";
import { Repository, In } from "typeorm";
import { PromoCode } from "./dto/promo.dto";
import { PromoCodeExeption } from "./exeprion/promo.exeprion";
import { InjectRepository } from '@nestjs/typeorm';
import PromoCodeEntity from "./entity/promo.entity";
import { PromoSearchService } from "./promoSearch.service";

@Injectable()
export class PromoCodeService {
    constructor(
        @InjectRepository(PromoCodeEntity)
        private promoCodeRepository: Repository<PromoCodeEntity>,
        private promoCodeSearchService: PromoSearchService,
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
       const newPromoCode = await this.promoCodeRepository.create(dto);
       await this.promoCodeRepository.save(newPromoCode);
       return newPromoCode;

    }

    async searchForPromoCodes(text: string) {
        const results = await this.promoCodeSearchService.search(text);
        const ids = results.map((result: PromoCodeEntity) => result.id);

        if (!ids.length) {
          return [];
        }
        return this.promoCodeRepository.find({
          where: { id: In(ids) },
        });
      }

    async deletePromoCode(@Param('id') id: number): Promise<void> {
        const promoCode = await this.promoCodeRepository.findOne({where: {id}});

        if(!promoCode) {
            throw new PromoCodeExeption('Note is empty');
        }
        
        await this.promoCodeRepository.remove(promoCode);
    }
}