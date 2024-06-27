import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class RemoveContactDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  contactUserId?: number;
}
