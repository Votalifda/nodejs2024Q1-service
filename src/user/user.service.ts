import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {plainToClass} from "class-transformer";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./user.interface";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '9ffe2ff7-7d15-4682-a012-a5e398c70e11',
      login: 'User1',
      password: '12345',
      version: 1,
      createdAt: 1710035047386,
      updatedAt: 1710035047386
    },
    {
      id: '9ffe2ff7-7d15-4682-a012-a5e398c70e12',
      login: 'User2',
      password: '12345',
      version: 1,
      createdAt: 1710035047386,
      updatedAt: 1710035047386
    }
  ];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return this.toDto(user);
  }

  findAll() {
    return this.users.map(user => this.toDto(user));
  }

  findOne(id: string): UserDto {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toDto(user)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = updateUserDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    return this.toDto(user);
  }

  remove(id: string) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.users = this.users.filter(user => user.id !== id);
  }

  private toDto(user: User): UserDto {
    const { password, ...userDto } = user;
    return plainToClass(UserDto, userDto);
  }
}
