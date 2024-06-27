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
import { CreateContactDto } from './dto/create-message.dto';
import { FindContactDto } from './dto/find-message.dto';
import { UpdateContactDto } from './dto/update-message.dto';
import { MessagesService } from './message.service';

@ApiTags('Message')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({
    description: 'Listagem de mensagens utilizando filtros.',
    tags: ['Message'],
  })
  @Get()
  find(@Query() query?: FindContactDto) {
    const params = getParams(query);
    return this.messagesService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de mensagem utilizando id.',
    tags: ['Message'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de mensagem.',
    tags: ['Message'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateContactDto) {
    return this.messagesService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Atualização de mensagem',
    tags: ['Message'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateContactDto,
  ) {
    const response = await this.messagesService.update(id, updateUserDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de mensagem',
    tags: ['Message'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.messagesService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
