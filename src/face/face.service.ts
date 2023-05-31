import { Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { FaceCoordinates } from './face.interface';

@Injectable()
export class FaceControllerService {
  handleFaceCoordinates(faceCoordinates: FaceCoordinates) {
    console.log('Received face coordinates:', faceCoordinates);
    return 'Face coordinates received';
  }
}