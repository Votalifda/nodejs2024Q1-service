import {Injectable, NotFoundException} from '@nestjs/common';
import {AlbumService} from "../album/album.service";
import {ArtistService} from "../artist/artist.service";
import {TrackService} from "../track/track.service";
import {UnprocessableEntityException} from "@nestjs/common/exceptions/unprocessable-entity.exception";

@Injectable()
export class FavsService {
  constructor(
      private readonly tracksService: TrackService,
      private readonly albumsService: AlbumService,
      private readonly artistsService: ArtistService,
  ) {}

  private favs: FavoritesResponse = {
    artists: [],
    albums: [],
    tracks: []
  }

  findAll() {
    return this.favs;
  }
  addTrack(id: string) {
    const item = this.tracksService.tracks.find(track => track.id === id);
    if (!item) {
      throw new UnprocessableEntityException('Track doesn\'t exist');
    }

    if (!this.favs.tracks.find(track => track.id === id)) {
      this.favs.tracks.push(item);
    }
  }

  removeTrack(id: string) {
    const item = this.favs.tracks.find(track => track.id === id);

    if (!item) {
      throw new NotFoundException('Track not found');
    }

    this.favs.tracks = this.favs.tracks.filter(track => track.id !== id);
  }

  addAlbum(id: string) {
    const item = this.albumsService.albums.find(album => album.id === id);
    if (!item) {
      throw new UnprocessableEntityException('Album doesn\'t exist');
    }

    if (!this.favs.albums.find(album => album.id === id)) {
      this.favs.albums.push(item);
    }
  }

  removeAlbum(id: string) {
    const item = this.favs.albums.find(album => album.id === id);

    if (!item) {
      throw new NotFoundException('Album not found');
    }

    this.favs.albums = this.favs.albums.filter(album => album.id !== id);
  }

  addArtist(id: string) {
    const item = this.artistsService.artists.find(artist => artist.id === id);
    if (!item) {
      throw new UnprocessableEntityException('Artist doesn\'t exist');
    }

    if (!this.favs.artists.find(artist => artist.id === id)) {
      this.favs.artists.push(item);
    }
  }

  removeArtist(id: string) {
    const item = this.favs.artists.find(artist => artist.id === id);

    if (!item) {
      throw new NotFoundException('Artist not found');
    }

    this.favs.artists= this.favs.artists.filter(artist => artist.id !== id);
  }

}
