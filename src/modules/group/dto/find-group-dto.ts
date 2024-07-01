import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { GenericParamsDto } from 'src/common/dtos/generic-params.dto';

export class FiltersGroupDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 150)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 500)
  @IsOptional()
  description?: string;
}

export class ParamsGroupDto extends GenericParamsDto<FiltersGroupDto> {}

export class FindGroupDto extends FiltersGroupDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
