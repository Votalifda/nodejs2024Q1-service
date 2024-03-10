import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {v4 as uuidv4} from "uuid";
import {plainToClass} from "class-transformer";
import {ArtistDto} from "./dto/artist.dto";

@Injectable()
export class ArtistService {
  private artists: Artist[] = [
    {
      id: '9ffe2ff7-7d15-4682-a000-a5e398c70e11',
      name: 'Artist-1',
      grammy: false
    },
    {
      id: '9ffe2ff7-7d15-4682-a000-a5e398c70e12',
      name: 'Artist-2',
      grammy: true
    }
  ];

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

    this.artists = this.artists.filter(artist => artist.id !== id);
  }

  private toDto(artist: Artist): ArtistDto {
    return plainToClass(ArtistDto, artist);
  }
}
