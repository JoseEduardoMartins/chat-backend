import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { encrypt } from '../../../common/helpers/crypto';
import { User } from '../../users/entities/user.entity';

export class SignUpAuthDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  @Unique(User, 'phone')
  phone: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 150)
  @Unique(User, 'email')
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => encrypt(value))
  @Length(8, 300)
  password: string;
}
