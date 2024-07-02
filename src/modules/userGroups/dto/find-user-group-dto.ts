import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

export class FiltersUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @Length(0, 150)
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 6)
  @IsOptional()
  securityCode?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

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

export class ParamsUserDto extends GenericParamsDto<FiltersUserDto> {}

export class FindUserDto extends FiltersUserDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
