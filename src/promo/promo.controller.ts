import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseFilters} from "@nestjs/common";
import { PromoCode } from "./dto/promo.dto";
import { PromoCodeFilter } from "./filter/promo-filter";
import { PromoCodeService } from "./promo.service";
import {v4 as uuidv4 } from 'uuid';


@Controller('promo-codes') 
@UseFilters(new PromoCodeFilter())
export class PromoCodeController {
    constructor(private readonly promoCodeService: PromoCodeService) {}

    @Get()
    async findPromoCode() {
        return await this.promoCodeService.getPromoCode();
    }

    @Get(':id')
    async findPromoCodeById(@Param('id') id: number) {
        return await this.promoCodeService.getPromoCodeById(id);
    }

    @Post()
    public async createPromoCode(@Body() dto: PromoCode) {
        const id = uuidv4();
        return await this.promoCodeService.addPromoCode({...dto, id});
    }

    @Delete(':id')
    async deletePromoCode(@Param(':id') id: number): Promise<void> {
        return this.promoCodeService.deletePromoCode(id);
    }
}
