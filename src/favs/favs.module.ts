import {forwardRef, Module} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import {TrackModule} from "../track/track.module";
import {AlbumModule} from "../album/album.module";
import {ArtistModule} from "../artist/artist.module";

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule)
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService]
})

export class FavsModule {}
