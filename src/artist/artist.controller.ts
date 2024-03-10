import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException, NotFoundException
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {UUIdValidationPipe} from "../validation/uuid-validation.pipe";

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name) {
      throw new BadRequestException('Name is required');
    } else if (!createArtistDto.grammy) {
      throw new BadRequestException('Grammy is required');
    }

    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIdValidationPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Patch(':id')
  update(@Param('id', UUIdValidationPipe) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!updateArtistDto.name) {
      throw new BadRequestException('Name is required');
    } else if (!updateArtistDto.grammy) {
      throw new BadRequestException('Grammy is required');
    }

    if (!this.artistService.findOne(id)) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIdValidationPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.artistService.remove(id);
  }
}
