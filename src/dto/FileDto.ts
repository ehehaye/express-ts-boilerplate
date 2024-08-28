import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class FileDto {
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  category?: string;
}
