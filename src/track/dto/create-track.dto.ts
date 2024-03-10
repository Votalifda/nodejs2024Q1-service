import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateTrackDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    artistId: string | null;
    albumId: string | null;

    @IsNumber()
    duration: number;
}
