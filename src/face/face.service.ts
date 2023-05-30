import { Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Injectable()
export class FaceControllerService {
  handleFaceCoordinates(@Body() faceCoordinates: any) {
    //console.log('Received face coordinates:', faceCoordinates);
    return 'Face coordinates received';
  }
}