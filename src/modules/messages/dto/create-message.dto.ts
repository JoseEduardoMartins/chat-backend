import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exist } from 'src/common/decorators/is-exist.decorator';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateContactDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(User, 'id')
  senderId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(User, 'id')
  receiverId: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Exist(User, 'id')
  groupId?: number;

  @ApiProperty({ required: true })
  @IsString()
  content: string;
}
