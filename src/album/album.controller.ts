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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {UUIdValidationPipe} from "../validation/uuid-validation.pipe";

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name) {
      throw new BadRequestException('Name is required');
    } else if (!createAlbumDto.year) {
      throw new BadRequestException('Year is required');
    } else if (!createAlbumDto.artistId) {
      throw new BadRequestException('ArtistId is required');
    }

    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIdValidationPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Patch(':id')
  update(@Param('id', UUIdValidationPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!updateAlbumDto.name) {
      throw new BadRequestException('Name is required');
    } else if (!updateAlbumDto.year) {
      throw new BadRequestException('Year is required');
    } else if (!updateAlbumDto.artistId) {
      throw new BadRequestException('ArtistId is required');
    }

    if (!this.albumService.findOne(id)) {
      throw new NotFoundException('Album not found');
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIdValidationPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumService.remove(id);
  }
}
