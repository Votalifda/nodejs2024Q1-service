import {forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {v4 as uuidv4} from "uuid";
import {plainToClass} from "class-transformer";
import {ArtistDto} from "./dto/artist.dto";
import {TrackService} from "../track/track.service";
import {AlbumService} from "../album/album.service";
import {FavsService} from "../favs/favs.service";

@Injectable()
export class ArtistService {
  public artists: Artist[] = [];

  constructor(
      private readonly tracksService: TrackService,
      private readonly albumService: AlbumService,
      @Inject(forwardRef(() => FavsService)) private favsService: FavsService
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(artist);
    return this.toDto(artist);
  }

  findAll() {
    return this.artists.map(artist => this.toDto(artist));
  }

  findOne(id: string) {
    const artist = this.artists.find(artist => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.toDto(artist)
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.find(artist => artist.id === id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return this.toDto(artist);
  }

  remove(id: string) {
    const artist = this.artists.find(artist => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.tracksService.tracks = this.tracksService.tracks.map(track => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    this.albumService.albums = this.albumService.albums.map(album => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });

    this.favsService.favs.artists = this.favsService.favs.artists.filter(artist => artist.id !== id);
    this.artists = this.artists.filter(artist => artist.id !== id);
  }

  private toDto(artist: Artist): ArtistDto {
    return plainToClass(ArtistDto, artist);
  }
}
