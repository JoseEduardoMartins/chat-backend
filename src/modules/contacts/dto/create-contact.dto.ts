import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Exist } from 'src/common/decorators/is-exist.decorator';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateContactUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(User, 'id')
  id: number;
}

export class CreateContactDto {
  @ApiProperty({ required: true, type: CreateContactUserDto })
  @ValidateNested()
  @Type(() => CreateContactUserDto)
  user: CreateContactUserDto;

  @ApiProperty({ required: true, type: CreateContactUserDto })
  @ValidateNested()
  @Type(() => CreateContactUserDto)
  userContact: CreateContactUserDto;
}
