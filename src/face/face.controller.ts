import { Controller, Post, Body } from '@nestjs/common';
import { FaceCoordinates } from './face.interface';
import { FaceControllerService } from './face.service';

@Controller('api')
export class FaceController {
  constructor(private readonly faceController: FaceControllerService) {}

  @Post('face-coordinates')
  async handleFaceCoordinates(@Body() faceCoordinates: FaceCoordinates) {
    return await this.faceController.handleFaceCoordinates(faceCoordinates);
  }
}