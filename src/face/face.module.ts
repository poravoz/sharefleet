import { Module } from '@nestjs/common';
import { FaceControllerService } from './face.service';
import { FaceController } from './face.controller';

@Module({
  imports: [],
  controllers: [FaceController],
  providers: [FaceControllerService],
})
export class FaceModule {}