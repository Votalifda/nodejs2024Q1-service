import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {plainToClass} from "class-transformer";
import {AlbumDto} from "./dto/album.dto";
import {v4 as uuidv4} from "uuid";
import {TrackService} from "../track/track.service";

@Injectable()
export class AlbumService {
  public albums: Album[] = [];

  constructor(
      private readonly tracksService: TrackService,
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
    return this.albums.map(album => this.toDto(album));
  }

  findOne(id: string) {
    const album = this.albums.find(album => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.toDto(album)
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find(album => album.id === id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return this.toDto(album);
  }

  remove(id: string) {
    const album = this.albums.find(album => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.tracksService.tracks = this.tracksService.tracks.map(track => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });

    this.albums = this.albums.filter(album => album.id !== id);
  }

  private toDto(album: Album): AlbumDto {
    return plainToClass(AlbumDto, album);
  }
}
