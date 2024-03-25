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
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', UUIdValidationPipe) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put(':id')
  async update(
    @Param('id', UUIdValidationPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!await this.trackService.findOne(id)) {
      throw new NotFoundException('Track not found');
    }

    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', UUIdValidationPipe) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return await this.trackService.remove(id);
  }
}
