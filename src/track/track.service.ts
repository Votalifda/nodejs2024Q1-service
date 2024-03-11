import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { plainToClass } from 'class-transformer';
import { FavsService } from '../favs/favs.service';
import {Track} from "./track.interface";

@Injectable()
export class TrackService {
  public tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
  ) {}

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
    return this.tracks.map((track) => this.toDto(track));
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.toDto(track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((track) => track.id === id);
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;

    return this.toDto(track);
  }

  remove(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.favsService.favs.tracks = this.favsService.favs.tracks.filter(
      (track) => track.id !== id,
    );
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  private toDto(track: Track): TrackDto {
    return plainToClass(TrackDto, track);
  }
}
