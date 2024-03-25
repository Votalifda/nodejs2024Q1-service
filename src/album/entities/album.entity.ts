import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {Artist} from "../../artist/entities/artist.entity";

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @OneToOne(() => Artist, artist => artist.id)
  artist: Artist;
}
