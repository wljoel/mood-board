import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCRUD } from '../../../../shared/constants';
import {
  CreateOrReadUserMutation,
  DeleteUserMutation,
} from '../../../../shared/types/User';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':sub')
  async [UserCRUD.createOrRead](
    @Body() user: CreateOrReadUserMutation,
  ): Promise<User> {
    return await this.usersService[UserCRUD.createOrRead](user);
  }

  @Delete(':sub')
  [UserCRUD.delete](@Param() user: DeleteUserMutation): Promise<User> {
    return this.usersService[UserCRUD.delete](user);
  }
}
