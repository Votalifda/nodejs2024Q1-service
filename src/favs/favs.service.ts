import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { FavArtists } from './entities/favArtists.entity';
import { FavAlbums } from './entities/favAlbums.entity';
import { FavTracks } from './entities/favTracks.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavArtists)
    private favArtistsRepository: Repository<FavArtists>,
    @InjectRepository(FavAlbums)
    private favAlbumsRepository: Repository<FavAlbums>,
    @InjectRepository(FavTracks)
    private favTracksRepository: Repository<FavTracks>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    const allArtists = await this.artistRepository.find();
    const favArtists = await this.favArtistsRepository.find();
    const allAlbums = await this.albumRepository.find();
    const favAlbums = await this.favAlbumsRepository.find();
    const allTracks = await this.trackRepository.find();
    const favTracks = await this.favTracksRepository.find();

    return {
      artists: allArtists.filter((entity) =>
        favArtists.map((item) => item.artistId).includes(entity.id),
      ),
      albums: allAlbums.filter((entity) =>
        favAlbums.map((item) => item.albumId).includes(entity.id),
      ),
      tracks: allTracks.filter((entity) =>
        favTracks.map((item) => item.trackId).includes(entity.id),
      ),
    };
  }
  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    const item = await this.favTracksRepository.findOne({
      where: { trackId: id },
    });
    if (!track) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
    if (!item) {
      await this.favTracksRepository.save({ trackId: id });
    }
  }

  async removeTrack(id: string) {
    const item = await this.favTracksRepository.findOne({
      where: { trackId: id },
    });
    if (!item) {
      throw new NotFoundException('Track not found');
    }
    await this.favTracksRepository.delete(id);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    const item = await this.favAlbumsRepository.findOne({
      where: { albumId: id },
    });
    if (!album) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
    if (!item) {
      await this.favAlbumsRepository.save({ albumId: id });
    }
  }

  async removeAlbum(id: string) {
    const item = await this.favAlbumsRepository.findOne({
      where: { albumId: id },
    });
    if (!item) {
      throw new NotFoundException('Album not found');
    }
    await this.favAlbumsRepository.delete(id);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    const item = await this.favArtistsRepository.findOne({
      where: { artistId: id },
    });
    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
    if (!item) {
      await this.favArtistsRepository.save({ artistId: id });
    }
  }

  async removeArtist(id: string) {
    const item = await this.favArtistsRepository.findOne({
      where: { artistId: id },
    });
    if (!item) {
      throw new NotFoundException('Artist not found');
    }
    await this.favArtistsRepository.delete(id);
  }
}
