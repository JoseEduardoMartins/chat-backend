import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'contact',
  orderBy: {
    id: 'ASC',
  },
  engine: 'InnoDB',
  synchronize: true,
})
export class Contact {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'int',
    name: 'contact_user_id',
  })
  contactUserId: number;

  constructor(contact?: Partial<Contact>) {
    this.id = contact?.id;
    this.userId = contact?.userId;
    this.contactUserId = contact?.contactUserId;
  }
}
