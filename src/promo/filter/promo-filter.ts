import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class PromoCodeFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

  }
}



