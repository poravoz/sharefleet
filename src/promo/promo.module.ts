import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchModule } from "src/search/search.module";
import PromoCodeEntity from "./entity/promo.entity";
import { PromoCodeController } from "./promo.controller";
import { PromoCodeService } from "./promo.service";
import { PromoSearchService } from "./promoSearch.service";


@Module({
    controllers: [PromoCodeController],
    imports: [TypeOrmModule.forFeature([PromoCodeEntity]), SearchModule],
    providers: [PromoCodeService, PromoSearchService],
    exports: [PromoCodeService, TypeOrmModule],
})

export class PromoCodeModule {}