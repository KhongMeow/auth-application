import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { GlobalService } from 'src/global/global.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, GlobalService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
