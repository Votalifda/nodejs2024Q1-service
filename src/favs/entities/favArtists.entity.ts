import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class FavArtists {
    @Column()
    @PrimaryColumn('uuid')
    artistId: string;
}
