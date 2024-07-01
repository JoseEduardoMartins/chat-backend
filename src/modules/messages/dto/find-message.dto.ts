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

export class FiltersMessageDto {
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
  isActived?: boolean;

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

export class ParamsMessageDto extends GenericParamsDto<FiltersMessageDto> {}

export class FindMessageDto extends FiltersMessageDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}

export class SelectMessageServiceDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  content?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActived?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isUpdated?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  createdAt?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  updatedAt?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  deletedAt?: boolean;
}

export class FindMessageServiceDto {
  select?: SelectMessageServiceDto;
  where;
}
