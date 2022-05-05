import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserProps } from '../../../../shared/types/User';
import { OmitId } from '../../../../shared/types/utility.types';

export type UserDocument = User & Document;

@Schema()
export class User implements OmitId<UserProps> {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  sub: string;

  @Prop()
  email_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
