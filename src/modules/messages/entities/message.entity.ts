import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({
  name: 'message',
  orderBy: {
    id: 'ASC',
  },
  engine: 'InnoDB',
  synchronize: true,
})
export class Message {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.messageSender)
  sender: User;

  @ManyToOne(() => User, (user) => user.messageReceiver)
  receiver: User;

  @Column({
    type: 'int',
    name: 'group_id',
    nullable: true,
  })
  groupId?: number;

  @Column({
    type: 'text',
    name: 'content',
  })
  content: string;

  @Column({
    type: 'boolean',
    name: 'is_actived',
    default: true,
  })
  isActived: boolean;

  @Column({
    type: 'boolean',
    name: 'is_updated',
    default: false,
  })
  isUpdated: boolean;

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

  constructor(message?: Partial<Message>) {
    this.id = message?.id;
    this.sender = message?.sender;
    this.receiver = message?.receiver;
    this.groupId = message?.groupId;
    this.content = message?.content;
    this.isActived = message?.isActived;
    this.isUpdated = message?.isUpdated;
    this.isDeleted = message?.isDeleted;
    this.createdAt = message?.createdAt;
    this.updatedAt = message?.updatedAt;
    this.deletedAt = message?.deletedAt;
  }
}
