import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { ParamsMessageDto } from './dto/find-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  find(paramsMessageDto?: ParamsMessageDto): Promise<Message[]> {
    return this.messageRepository.find(paramsMessageDto);
  }

  findOne(id: number): Promise<Message> {
    return this.messageRepository.findOne({
      where: { id },
      relations: {
        sender: true,
        receiver: true,
      },
    });
  }

  async create(
    createMessageDto: CreateMessageDto,
  ): Promise<GenericCreateResponse> {
    const data = {
      ...createMessageDto,
      isActived: true,
      isUpdated: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const message = this.messageRepository.create(data);
    const response = await this.messageRepository.save(message);
    return { id: response.id };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<void> {
    const data = {
      ...updateMessageDto,
      isUpdated: true,
      updatedAt: new Date(),
    };

    const response = await this.messageRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      isActived: false,
      isDeleted: true,
      deletedAt: new Date(),
    };

    const response = await this.messageRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
