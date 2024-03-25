import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {Artist} from "../../artist/entities/artist.entity";
import {Album} from "../../album/entities/album.entity";

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @OneToOne(() => Artist, artist => artist.id)
  artist: Artist;

  @OneToOne(() => Album, album => album.id)
  album: Album;
}
