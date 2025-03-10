import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { GlobalService } from 'src/global/global.service';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermission, Role, Permission]),
  ],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, GlobalService, RolesService, PermissionsService],
  exports: [RolePermissionsService]
})
export class RolePermissionsModule {}
