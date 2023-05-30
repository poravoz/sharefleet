import { Controller, Post, Body } from '@nestjs/common';
import { FaceControllerService } from './face.service';

@Controller('api')
export class FaceController {
  constructor(private readonly faceController: FaceControllerService) {}

  @Post('face-coordinates')
  async handleFaceCoordinates(@Body() faceCoordinates: any) {
    return await this.faceController.handleFaceCoordinates(faceCoordinates);
  }
}