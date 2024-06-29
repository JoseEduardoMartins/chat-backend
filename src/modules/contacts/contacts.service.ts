import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { RemoveContactDto } from './dto/remove--contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  find(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  findOne(id: number): Promise<Contact> {
    return this.contactRepository.findOne({
      where: { id },
      relations: {
        user: true,
        userContact: true,
      },
    });
  }

  async create(
    createContactDto: CreateContactDto,
  ): Promise<GenericCreateResponse> {
    const constact = this.contactRepository.create(createContactDto);
    const response = await this.contactRepository.save(constact);

    return { id: response.id };
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<void> {
    const response = await this.contactRepository.update(
      { id },
      updateContactDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(removeContactDto: RemoveContactDto): Promise<void> {
    if (!Object.keys(removeContactDto).length) return null;

    const response = await this.contactRepository.delete(removeContactDto);
    if (response?.affected === 0) return null;
  }
}
