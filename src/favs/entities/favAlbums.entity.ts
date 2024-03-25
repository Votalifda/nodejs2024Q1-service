import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FavAlbums {
  @Column()
  @PrimaryColumn('uuid')
  albumId: string;
}
