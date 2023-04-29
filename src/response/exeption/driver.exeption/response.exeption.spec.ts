import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ResponseExeption } from './response.exeption';

@Catch(ResponseExeption)
export class NoteResponseExeption implements ExceptionFilter {
  catch(exception: ResponseExeption, host: ArgumentsHost) {

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

describe('ResponseExeption', () => {
  it('should be defined', () => {
    expect(new ResponseExeption()).toBeDefined();
  });
});


