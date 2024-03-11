import {forwardRef, Module} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import {TrackModule} from "../track/track.module";
import {AlbumModule} from "../album/album.module";
import {FavsModule} from "../favs/favs.module";

@Module({
  imports: [TrackModule, AlbumModule, forwardRef(() => FavsModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService]
})

export class ArtistModule {}
