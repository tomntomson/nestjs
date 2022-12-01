import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entities';
import { HttpModule } from '@nestjs/axios';
import { GoodModule } from './good/good.module';


@Module({
  imports: [
    UsersModule, 
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'insubong38526',
      database: 'sys',
      entities: [User],
      synchronize: true, // false가 안전함
    }),
    GoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
