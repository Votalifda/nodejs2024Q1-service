import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Album} from "./entities/album.entity";
import {FavAlbums} from "../favs/entities/favAlbums.entity";
import {Track} from "../track/entities/track.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([FavAlbums]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
