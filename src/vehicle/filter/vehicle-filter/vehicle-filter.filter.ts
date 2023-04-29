import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class VehicleFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

  }
}



