import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 150)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 500)
  @IsOptional()
  description?: string;
}
