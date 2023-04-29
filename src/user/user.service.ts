import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,    
  ) {}

  async create(createUserDto: CreateUserDto) {

    const newUser = await this.userRepository.create( createUserDto );
    await this.userRepository.save(newUser);
    return this.getByEmail(newUser.email);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
    return {message: 'User deleted'};
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<User | undefined> {
    const user = await this.getById(userId);
 
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
 
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken : null
    });
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { currentHashedRefreshToken: refreshToken });
  }

}
