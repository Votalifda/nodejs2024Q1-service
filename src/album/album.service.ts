import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { plainToClass } from 'class-transformer';
import { AlbumDto } from './dto/album.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { Album } from './album.interface';

@Injectable()
export class AlbumService {
  public albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TrackService)) private tracksService: TrackService,
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(album);
    return this.toDto(album);
  }

  findAll() {
    return this.albums.map((album) => this.toDto(album));
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.toDto(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((album) => album.id === id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return this.toDto(album);
  }

  remove(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.tracksService.tracks = this.tracksService.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });

    this.favsService.favs.albums = this.favsService.favs.albums.filter(
      (album: Album) => album.id !== id,
    );
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  private toDto(album: Album): AlbumDto {
    return plainToClass(AlbumDto, album);
  }
}
