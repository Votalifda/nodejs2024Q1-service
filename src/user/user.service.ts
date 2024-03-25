import {Injectable, NotFoundException,} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      version: 1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000)
    });
    await this.userRepository.save(user);
    return this.toDto(user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => this.toDto(user));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id, {
      login: updateUserDto.login,
      password: updateUserDto.newPassword,
      version: user.version+=1,
      updatedAt: Math.floor(Date.now() / 1000)+1
    });

    const updatedUser = await this.userRepository.findOne({where: {id}});
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return this.toDto(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where: {id}});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
  }

  private toDto(user: User): UserDto {
    const { password, ...userDto } = user;
    password.length;
    return plainToClass(UserDto, userDto);
  }
}
