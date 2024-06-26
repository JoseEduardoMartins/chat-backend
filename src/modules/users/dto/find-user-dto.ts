import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsDate,
  IsBoolean,
  IsEmail,
  IsArray,
  Length,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

export class FiltersUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthdate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  tax_id?: string;

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
  @Length(0, 300)
  @IsOptional()
  photo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 6)
  @IsOptional()
  security_code?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  created_at?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  address_id?: number;
}

export class ParamsUserDto extends GenericParamsDto<FiltersUserDto> {}

export class FindUserDto extends FiltersUserDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
