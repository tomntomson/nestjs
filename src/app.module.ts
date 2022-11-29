import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [UsersModule, GoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
