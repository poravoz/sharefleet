import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import PromoCodeEntity from "./entity/promo.entity";
import { PromoCodeController } from "./promo.controller";
import { PromoCodeService } from "./promo.service";


@Module({
    controllers: [PromoCodeController],
    imports: [TypeOrmModule.forFeature([PromoCodeEntity])],
    providers: [PromoCodeService],
    exports: [PromoCodeService, TypeOrmModule],
})

export class PromoCodeModule {}