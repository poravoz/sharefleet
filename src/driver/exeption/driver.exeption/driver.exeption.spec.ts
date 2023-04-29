import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DriverExeption } from './driver.exeption';

@Catch(DriverExeption)
export class NoteDriverExeption implements ExceptionFilter {
  catch(exception: DriverExeption, host: ArgumentsHost) {

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

describe('DriverExeption', () => {
  it('should be defined', () => {
    expect(new DriverExeption()).toBeDefined();
  });
});


