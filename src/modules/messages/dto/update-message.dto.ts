import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;
}
