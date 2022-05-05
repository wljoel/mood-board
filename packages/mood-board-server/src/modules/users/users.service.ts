import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UserCRUD } from '../../../../shared/constants';
import {
  CreateOrReadUserMutation,
  DeleteUserMutation,
  UserProps,
} from '../../../../shared/types/User';

@Injectable()
export class UsersService {
  today: string;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.today = new Date().toString();
  }

  async [UserCRUD.createOrRead](
    user: CreateOrReadUserMutation,
  ): Promise<UserProps> {
    const maybeUser = await this.userModel.findOne({ sub: user.sub });

    if (maybeUser) {
      return maybeUser;
    } else {
      const addedUser = await this.userModel.create(user);
      return addedUser.save();
    }
  }

  async [UserCRUD.delete](user: DeleteUserMutation): Promise<UserProps> {
    return await this.userModel
      .findByIdAndRemove({
        sub: user.sub,
      })
      .exec();
  }
}
