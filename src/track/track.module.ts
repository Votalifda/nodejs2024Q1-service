import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Track} from "./entities/track.entity";
import {FavTracks} from "../favs/entities/favTracks.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([FavTracks]),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
