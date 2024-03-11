import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;
}
