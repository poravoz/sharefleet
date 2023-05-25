import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PromoCode } from './dto/promo.dto';
import promoCodeSearchResult from './types/postSearchResponse.interface';
import PromoCodeSearchBody from './types/promoSearchBodyInterface';

 
@Injectable()
export class PromoSearchService {
  index = 'promoCodes'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async search(text: string) { 
    console.log(text);

    const body = await this.elasticsearchService.search({
      
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ["code"]
          },
        },
      },
    });
    console.log(body);
    const hits = body.hits.hits;
    const results = new Set();
    hits.map((item) => {
      results.add(item._source as PromoCodeSearchBody); 
    });
    return Array.from(results);
  }
}

