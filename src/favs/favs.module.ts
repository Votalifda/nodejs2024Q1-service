import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { FavArtists } from './entities/favArtists.entity';
import { FavAlbums } from './entities/favAlbums.entity';
import { FavTracks } from './entities/favTracks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavArtists]),
    TypeOrmModule.forFeature([FavAlbums]),
    TypeOrmModule.forFeature([FavTracks]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Track]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
