import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('fav_albums')
export class FavAlbums {
  @Column()
  @PrimaryColumn('uuid')
  albumId: string;
}
