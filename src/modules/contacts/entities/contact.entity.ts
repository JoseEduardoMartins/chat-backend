import { User } from 'src/modules/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @ManyToOne(() => User, (user) => user.contacts)
  userContact: User;

  constructor(contact?: Partial<Contact>) {
    this.id = contact?.id;
    this.user = contact?.user;
    this.userContact = contact?.userContact;
  }
}
