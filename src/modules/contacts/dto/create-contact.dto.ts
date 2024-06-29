import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Exist } from 'src/common/decorators/is-exist.decorator';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateContactDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(User, 'id')
  userId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(User, 'id')
  userContactId: number;
}
