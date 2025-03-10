import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalService } from 'src/global/global.service';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [GlobalService],
  exports: [GlobalService]
})
export class GlobalModule {}
