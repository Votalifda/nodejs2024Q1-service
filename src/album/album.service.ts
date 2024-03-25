import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { plainToClass } from 'class-transformer';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FavAlbums} from "../favs/entities/favAlbums.entity";
import {Track} from "../track/entities/track.entity";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(FavAlbums)
    private favAlbumsRepository: Repository<FavAlbums>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);
    await this.albumRepository.save(album);
    return this.toDto(album);
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums.map((album) => this.toDto(album));
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({where: {id}});
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.toDto(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.albumRepository.update(id, updateAlbumDto);
    const updatedAlbum = await this.albumRepository.findOne({where: {id}});
    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }
    return this.toDto(updatedAlbum);
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({where: {id}});

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.favAlbumsRepository.delete({albumId: id});
    await this.trackRepository.update({albumId: id}, {albumId: null});
    await this.albumRepository.delete(id);
  }

  private toDto(album: Album): AlbumDto {
    return plainToClass(AlbumDto, album);
  }
}
