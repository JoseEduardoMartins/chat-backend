import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

export class FiltersContactDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  contactUserId?: number;
}

export class ParamsContactDto extends GenericParamsDto<FiltersContactDto> {}

export class FindContactDto extends FiltersContactDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
