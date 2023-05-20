import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PromoCode } from './dto/promo.dto';
import promoCodeSearchResult from './types/promoSearchBody.interface';
import PromoCodeSearchBody from './types/promoSearchBodyInterface';
import PostSearchBody from './types/promoSearchBodyInterface';
 
@Injectable()
export class PromoSearchService {
  index = 'promoCodes'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexPromoCode(promoCode: PromoCode) {
    return this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      body: {
        id: promoCode.id,
        code: promoCode.code,
        discount: promoCode.discount,
        startDate: promoCode.startDate,
        endDate: promoCode.endDate,
      }
    })
  }
 
  async search(text: string) {
    const body = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['startDate', 'endDate']
          },
        },
      },
    });
    const hits = body.hits.hits;
    const results = new Set();
    hits.map((item) => {
        results.add(item._source as PromoCodeSearchBody);
    });
    return Array.from(results);
  }
}

