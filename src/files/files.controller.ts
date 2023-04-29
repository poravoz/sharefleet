import { Controller, Post, Body, Get, Param, Delete, Req, UploadedFile, UseGuards, UseInterceptors, HttpException, HttpStatus, BadRequestException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublicFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is missing');
    }
    const avatar = await this.fileService.uploadPublicFile(file.buffer, file.originalname);
    return avatar;
  }
}
