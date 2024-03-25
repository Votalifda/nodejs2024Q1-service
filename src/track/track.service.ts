import {Injectable,  NotFoundException} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackDto } from './dto/track.dto';
import { plainToClass } from 'class-transformer';
import {Track} from "./entities/track.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TrackService {
  constructor(
      @InjectRepository(Track)
      private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);
    await this.trackRepository.save(track);
    return this.toDto(track);
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks.map((track) => this.toDto(track));
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({where: {id}});
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.toDto(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.trackRepository.update(id, updateTrackDto);
    const updatedTrack = await this.trackRepository.findOne({where: {id}});
    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }
    return this.toDto(updatedTrack);
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({where: {id}});

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    // this.favsService.favs.tracks = this.favsService.favs.tracks.filter(
    //   (track) => track.id !== id,
    // );

    await this.trackRepository.delete(id);
  }

  private toDto(track: Track): TrackDto {
    return plainToClass(TrackDto, track);
  }
}
