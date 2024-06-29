import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ContactsController } from './contact.controller';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ContactsService, UsersService],
  controllers: [ContactsController],
  exports: [TypeOrmModule],
})
export class ContactsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(ContactsController);
  }
}
