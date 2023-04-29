import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { VehicleExeption } from './vehicle.exeption';

@Catch(VehicleExeption)
export class NoteVehicleExeption implements ExceptionFilter {
  catch(exception: VehicleExeption, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(500)
      .json({
        timestamp: new Date().toISOString(),
        msg: exception.what()
      });
  }
}

describe('VehicleExeption', () => {
  it('should be defined', () => {
    expect(new VehicleExeption()).toBeDefined();
  });
});


