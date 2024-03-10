import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {v4 as uuidv4} from "uuid";
import {TrackDto} from "./dto/track.dto";
import {plainToClass} from "class-transformer";

@Injectable()
export class TrackService {
  private tracks: Track[] = [
    {
      id: '9ffe2ff7-7d15-0000-a000-a5e398c70e11',
      name: 'Track-1',
      duration: 100,
      artistId: '9ffe2ff7-0000-0000-a000-a5e398c70e11',
      albumId: '9ffe2ff7-0000-0000-a000-a5e398c70e12',
    },
    {
      id: '9ffe2ff7-7d15-0000-a000-a5e398c70e12',
      name: 'Track-2',
      duration: 50,
      artistId: '9ffe2ff7-0000-0000-a000-a5e398c70e12',
      albumId: '9ffe2ff7-0000-0000-a000-a5e398c70e12',
    },
    {
      id: '9ffe2ff7-7d15-0000-a000-a5e398c70e13',
      name: 'Track-3',
      duration: 150,
      artistId: '9ffe2ff7-0000-0000-a000-a5e398c70e12',
      albumId: '9ffe2ff7-0000-0000-a000-a5e398c70e12',
    }
  ];

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
    };
    this.tracks.push(track);
    return this.toDto(track);
  }

  findAll() {
    return this.tracks.map(track => this.toDto(track));
  }

  findOne(id: string) {
    const track = this.tracks.find(track => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.toDto(track)
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find(track => track.id === id);
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;

    return this.toDto(track);
  }

  remove(id: string) {
    const track = this.tracks.find(track => track.id === id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.tracks = this.tracks.filter(track => track.id !== id);
  }

  private toDto(track: Track): TrackDto {
    return plainToClass(TrackDto, track);
  }
}
