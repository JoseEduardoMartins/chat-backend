import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
//CONFIG
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import mailConfig from './config/mail.config';
//MODULES
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contact.module';
import { MailModule } from './modules/mail/mail.module';
import { UsersModule } from './modules/users/users.module';
//DECORATORS
import { ExistConstraint } from './common/decorators/is-exist.validator';
import { UniqueConstraint } from './common/decorators/is-unique.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production', '.env.development'],
      isGlobal: true,
      load: [appConfig, databaseConfig, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.userpassword'),
          entities: ['./**/*.entity{ .ts,.js}'],
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AuthModule,
    ContactsModule,
    MailModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UniqueConstraint, ExistConstraint],
})
export class AppModule {}
