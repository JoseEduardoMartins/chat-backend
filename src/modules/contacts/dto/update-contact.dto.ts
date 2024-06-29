import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';
import { CreateContactUserDto } from './create-contact.dto';

export class UpdateContactDto {
  @ApiProperty({ required: false, type: CreateContactUserDto })
  @ValidateNested()
  @Type(() => CreateContactUserDto)
  @IsOptional()
  user: CreateContactUserDto;

  @ApiProperty({ required: true, type: CreateContactUserDto })
  @ValidateNested()
  @Type(() => CreateContactUserDto)
  @IsOptional()
  userContact: CreateContactUserDto;
}
