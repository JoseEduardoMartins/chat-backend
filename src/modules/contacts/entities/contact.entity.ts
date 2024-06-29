import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'varchar',
    name: 'name',
    length: 300,
  })
  name: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @ManyToOne(() => User, (user) => user.userContacts)
  userContact: User;

  constructor(contact?: Partial<Contact>) {
    this.id = contact?.id;
    this.user = contact?.user;
    this.userContact = contact?.userContact;
  }
}
