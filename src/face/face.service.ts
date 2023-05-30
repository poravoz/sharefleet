import { Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Injectable()
export class FaceControllerService {
  handleFaceCoordinates(@Body() faceCoordinates: number) {
    //console.log('Received face coordinates:', faceCoordinates);
    return 'Face coordinates received';
  }
}