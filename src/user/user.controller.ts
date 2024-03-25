import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Put, ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUIdValidationPipe } from '../validation/uuid-validation.pipe';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', UUIdValidationPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async update(
    @Param('id', UUIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.password == updateUserDto.oldPassword || user.password != updateUserDto.oldPassword) {
      throw new ForbiddenException('Password is wrong');
    }
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', UUIdValidationPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userService.remove(id);
  }
}
