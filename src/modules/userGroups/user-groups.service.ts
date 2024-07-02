import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Repository } from 'typeorm';
import { CreateUserServiceDto } from './dto/create-user-group.dto';
import { ParamsUserDto } from './dto/find-user-group-dto';
import { UpdateUserServideDto } from './dto/update-user-group.dto';
import { UserGroups } from './entities/user-group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserGroups)
    private userRepository: Repository<UserGroups>,
  ) {}

  find(paramsUserDto?: ParamsUserDto): Promise<UserGroups[]> {
    return this.userRepository.find(paramsUserDto);
  }

  findOne(id: number): Promise<UserGroups> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(
    createUserDto: CreateUserServiceDto,
  ): Promise<GenericCreateResponse> {
    const data = {
      ...createUserDto,
      isActived: true,
      isVerified: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = this.userRepository.create(data);
    const response = await this.userRepository.save(user);
    return { id: response.id };
  }

  async update(id: number, updateUserDto: UpdateUserServideDto): Promise<void> {
    const data = {
      ...updateUserDto,
      updatedAt: new Date(),
    };

    const response = await this.userRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      isActived: false,
      isDeleted: true,
      deletedAt: new Date(),
    };

    const response = await this.userRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
