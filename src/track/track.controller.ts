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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUIdValidationPipe } from '../validation/uuid-validation.pipe';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name) {
      throw new BadRequestException('Name is required');
    } else if (!createTrackDto.duration) {
      throw new BadRequestException('Duration is required');
    }

    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIdValidationPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put(':id')
  update(
    @Param('id', UUIdValidationPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!updateTrackDto.name) {
      throw new BadRequestException('Name is required');
    } else if (!updateTrackDto.duration) {
      throw new BadRequestException('Duration is required');
    }

    if (!this.trackService.findOne(id)) {
      throw new NotFoundException('Track not found');
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIdValidationPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.trackService.remove(id);
  }
}
