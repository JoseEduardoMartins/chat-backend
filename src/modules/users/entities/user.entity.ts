import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 50,
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 300,
  })
  password: string;

  @Column({
    name: 'security_code',
    type: 'varchar',
    length: 6,
    nullable: true,
  })
  security_code?: string;

  @Column({
    name: 'is_actived',
    type: 'boolean',
    default: true,
  })
  is_actived: boolean;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
  })
  is_verified: boolean;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  is_deleted: boolean;

  @Column({
    name: 'created_at',
    type: 'datetime',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
  })
  updated_at: Date;

  @Column({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
  })
  deleted_at?: Date;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.phone = user?.phone;
    this.email = user?.email;
    this.password = user?.password;
  }
}
