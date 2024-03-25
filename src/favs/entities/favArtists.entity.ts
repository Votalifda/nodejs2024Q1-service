import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('fav_artists')
export class FavArtists {
  @Column()
  @PrimaryColumn('uuid')
  artistId: string;
}
