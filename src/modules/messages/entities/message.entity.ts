import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'int',
    name: 'sender_id',
  })
  senderId: number;

  @Column({
    type: 'int',
    name: 'receiver_id',
  })
  receiverId: number;

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
    this.senderId = message?.senderId;
    this.receiverId = message?.receiverId;
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
