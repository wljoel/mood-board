import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BoardProps } from '../../../../shared/types/Board';
import { OmitId } from '../../../../shared/types/utility.types';

export type BoardDocument = Board & Document;

@Schema()
export class Board implements OmitId<BoardProps> {
  @Prop()
  title: string;

  @Prop()
  items: [];

  @Prop()
  creationDate: string;

  @Prop()
  modificationDate: string;

  @Prop()
  owner_sub: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
