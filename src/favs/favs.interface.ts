import { Album } from '../album/album.interface';
import { Artist } from '../artist/artist.interface';
import { Track } from '../track/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
