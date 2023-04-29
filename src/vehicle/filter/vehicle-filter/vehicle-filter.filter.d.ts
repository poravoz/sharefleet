import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class VehicleFilterFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void;
}
