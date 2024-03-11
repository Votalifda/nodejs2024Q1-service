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
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUIdValidationPipe } from '../validation/uuid-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIdValidationPipe) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  update(
    @Param('id', UUIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIdValidationPipe) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.remove(id);
  }
}
