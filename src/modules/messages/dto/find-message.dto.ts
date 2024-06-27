import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

export class FiltersContactDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  senderId: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  receiverId: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  groupId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isUpdated?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}

export class ParamsContactDto extends GenericParamsDto<FiltersContactDto> {}

export class FindContactDto extends FiltersContactDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
