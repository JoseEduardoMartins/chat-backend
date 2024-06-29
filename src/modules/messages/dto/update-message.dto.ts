import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;
}
