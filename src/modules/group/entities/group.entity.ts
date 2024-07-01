import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'group',
  orderBy: {
    id: 'ASC',
  },
  engine: 'InnoDB',
  synchronize: true,
})
export class Group {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'description',
    length: 500,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'boolean',
    name: 'is_actived',
    default: true,
  })
  isActived: boolean;

  @Column({
    type: 'boolean',
    name: 'is_deleted',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;

  constructor(user?: Partial<Group>) {
    this.id = user?.id;
    this.name = user?.name;
    this.description = user?.description;
    this.isActived = user?.isActived;
    this.isDeleted = user?.isDeleted;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
  }
}
