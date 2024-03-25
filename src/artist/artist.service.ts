import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { plainToClass } from 'class-transformer';
import { ArtistDto } from './dto/artist.dto';
import {Artist} from "./entities/artist.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ArtistService {
  public artists: Artist[] = [];

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(artist);
    return this.toDto(artist);
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => this.toDto(artist));
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({where: {id}});
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.toDto(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.artistRepository.update(id, updateArtistDto);
    const updatedArtist = await this.artistRepository.findOne({where: {id}});
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return this.toDto(updatedArtist);
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({where: {id}});

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    //
    // this.tracksService.tracks = this.tracksService.tracks.map((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    //   return track;
    // });
    //
    // this.albumService.albums = this.albumService.albums.map((album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    //   return album;
    // });
    //
    // this.favsService.favs.artists = this.favsService.favs.artists.filter(
    //   (artist) => artist.id !== id,
    // );

    await this.artistRepository.delete(id);
  }

  private toDto(artist: Artist): ArtistDto {
    return plainToClass(ArtistDto, artist);
  }
}
