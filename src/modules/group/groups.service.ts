import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { ParamsGroupDto } from './dto/find-group-dto';
import { UpdateGrouDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  find(paramsGroupDto?: ParamsGroupDto): Promise<Group[]> {
    return this.groupRepository.find(paramsGroupDto);
  }

  findOne(id: number): Promise<Group> {
    return this.groupRepository.findOne({ where: { id } });
  }

  async create(createGroupDto: CreateGroupDto): Promise<GenericCreateResponse> {
    const data = {
      ...createGroupDto,
      isActived: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = this.groupRepository.create(data);
    const response = await this.groupRepository.save(user);
    return { id: response.id };
  }

  async update(id: number, updateGroupDto: UpdateGrouDto): Promise<void> {
    const data = {
      ...updateGroupDto,
      updatedAt: new Date(),
    };

    const response = await this.groupRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      isActived: false,
      isDeleted: true,
      deletedAt: new Date(),
    };

    const response = await this.groupRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
