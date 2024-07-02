import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Group } from 'src/modules/group/entities/group.entity';

export enum UserType {
  creator = 'creator',
  administrator = 'administrator',
  member = 'member',
}

@Entity({
  name: 'user_group',
  orderBy: {
    id: 'ASC',
  },
  engine: 'InnoDB',
  synchronize: true,
})
export class UserGroups {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Group)
  group: string;

  @Column({
    type: 'enum',
    name: 'user_type',
    enum: UserType,
  })
  userType: UserType;

  constructor(user?: Partial<UserGroups>) {
    this.id = user?.id;
    this.user = user?.user;
    this.group = user?.group;
    this.userType = user?.userType;
  }
}
