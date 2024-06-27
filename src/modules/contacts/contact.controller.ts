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
import { CreateContactDto } from './dto/create-contact.dto';
import { FindContactDto } from './dto/find-contact-dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { RemoveContactDto } from './dto/remove--contact.dto';
import { ContactsService } from './contacts.service';

@ApiTags('Contact')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @ApiOperation({
    description: 'Listagem de contatos utilizando filtros.',
    tags: ['Contact'],
  })
  @Get()
  find(@Query() query?: FindContactDto) {
    const params = getParams(query);
    return this.contactService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de contato utilizando id.',
    tags: ['Contact'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de contato.',
    tags: ['Contact'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({
    description: 'Atualização de contato',
    tags: ['Contact'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const response = await this.contactService.update(id, updateContactDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de contato',
    tags: ['Contact'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Query() query: RemoveContactDto) {
    const response = await this.contactService.remove(query);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
