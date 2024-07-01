import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGrouDto extends PartialType(CreateGroupDto) {}
