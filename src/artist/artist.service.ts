import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { plainToClass } from 'class-transformer';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { FavArtists } from '../favs/entities/favArtists.entity';

@Injectable()
export class ArtistService {
  public artists: Artist[] = [];

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(FavArtists)
    private favArtistsRepository: Repository<FavArtists>,
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
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.toDto(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.artistRepository.update(id, updateArtistDto);
    const updatedArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return this.toDto(updatedArtist);
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.favArtistsRepository.delete({ artistId: id });
    await this.trackRepository.update({ artistId: id }, { artistId: null });
    await this.albumRepository.update({ artistId: id }, { artistId: null });
    await this.artistRepository.delete(id);
  }

  private toDto(artist: Artist): ArtistDto {
    return plainToClass(ArtistDto, artist);
  }
}
