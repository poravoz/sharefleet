import { Controller, Post, Body, Get, Param, Delete, Req, UploadedFile, UseGuards, UseInterceptors, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import JwtAuthGuard from '../auth/jwt-strategy/jwt-auth.guard';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly fileService: FilesService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }



  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublicFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!file) {
      throw new BadRequestException('File is missing');
    }
    const avatar = await this.fileService.uploadPublicFile(file.buffer, file.originalname);
    return avatar;
  }

  @Delete('uploadfile/:id')
  async deletePublicFile(@Param('id') id: string): Promise<void> {
    await this.fileService.deletePublicFile(id);
  }


}
