import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class DriverFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

  }
}




