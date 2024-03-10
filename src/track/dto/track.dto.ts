import { Expose } from 'class-transformer';

export class TrackDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    artistId: number;

    @Expose()
    albumId: number;

    @Expose()
    duration: number;
}
