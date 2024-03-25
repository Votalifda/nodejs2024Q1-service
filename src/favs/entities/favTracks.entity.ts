import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('fav_tracks')
export class FavTracks {
  @Column()
  @PrimaryColumn('uuid')
  trackId: string;
}
