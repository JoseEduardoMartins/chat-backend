import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ParamsUserDto } from './dto/find-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  find(paramsUserDto?: ParamsUserDto): Promise<User[]> {
    return this.userRepository.find(paramsUserDto);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<GenericCreateResponse> {
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const data = {
      ...updateUserDto,
      updatedAt: new Date(),
    };

    const response = await this.userRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      isActive: false,
      isDeleted: true,
      deletedAt: new Date(),
    };

    const response = await this.userRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
