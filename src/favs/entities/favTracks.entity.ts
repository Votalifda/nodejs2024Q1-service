import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FavTracks {
  @Column()
  @PrimaryColumn('uuid')
  trackId: string;
}
