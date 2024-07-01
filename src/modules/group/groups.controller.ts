import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getParams } from '../../common/helpers/params';
import { CreateGroupDto } from './dto/create-group.dto';
import { FindGroupDto } from './dto/find-group-dto';
import { UpdateGrouDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@ApiTags('Group')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({
    description: 'Listagem de grupos utilizando filtros.',
    tags: ['Group'],
  })
  @Get()
  find(@Query() query?: FindGroupDto) {
    const params = getParams(query);
    return this.groupsService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de grupo utilizando id.',
    tags: ['Group'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de grupo.',
    tags: ['Group'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateGroupDto) {
    return this.groupsService.create(body);
  }

  @ApiOperation({
    description: 'Atualização de grupo',
    tags: ['Group'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateGrouDto,
  ) {
    const response = await this.groupsService.update(id, body);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de grupo',
    tags: ['Group'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.groupsService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
