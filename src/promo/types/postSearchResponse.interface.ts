import promoCodeSearchBody from './promoSearchBodyInterface';
 
interface promoCodeSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: promoCodeSearchBody;
    }>;
  };
}

export default promoCodeSearchResult;