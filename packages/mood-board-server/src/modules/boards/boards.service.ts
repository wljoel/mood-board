import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './boards.schema';
import {
  BoardProps,
  CreateBoardMutation,
  DeleteBoardMutation,
  ReadAllBoardsQuery,
  ReadBoardQuery,
} from '../../../../shared/types/Board';
import { BoardCRUD } from '../../../../shared/constants';
import { OmitId } from '../../../../shared/types/utility.types';
import {
  CreateItemMutation,
  DeleteItemMutation,
  ItemProps,
  UpdateItemMutation,
} from '../../../../shared/types/Item';
import { v4 as uid } from 'uuid';

@Injectable()
export class BoardsService {
  today: string;

  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {
    this.today = new Date().toString();
  }

  async [BoardCRUD.create](board: CreateBoardMutation): Promise<BoardProps> {
    const newBoard: OmitId<BoardProps> = {
      title: board.title,
      items: [],
      creationDate: this.today,
      modificationDate: this.today,
      owner_sub: board.owner_sub,
    };

    const addedBoard = await this.boardModel.create(newBoard);
    return addedBoard.save();
  }

  async [BoardCRUD.createItem](item: CreateItemMutation): Promise<BoardProps> {
    const newItem: OmitId<ItemProps> = {
      id: uid(),
      title: item.title,
      imageUrl: item.imageUrl,
      note: item.note,
    };
    await this.boardModel.updateOne(
      { _id: item.board_id },
      { $push: { items: newItem } },
    );

    return this.boardModel.findById({ _id: item.board_id });
  }

  async [BoardCRUD.updateItem](item: UpdateItemMutation): Promise<BoardProps> {
    await this.boardModel.updateMany(
      { _id: item.board_id, 'items.id': item.id },
      {
        $set: {
          'items.$.title': item.title,
          'items.$.imageUrl': item.imageUrl,
          'items.$.note': item.note,
        },
      },
    );

    return this.boardModel.findById({ _id: item.board_id });
  }

  async [BoardCRUD.deleteItem](item: DeleteItemMutation): Promise<any> {
    await this.boardModel.updateOne(
      { _id: item.board_id },
      { $pull: { items: { id: item.id } } },
    );

    return this.boardModel.findById({ _id: item.board_id });
  }

  async [BoardCRUD.read](board: ReadBoardQuery): Promise<BoardProps> {
    return this.boardModel.findById({ _id: board._id });
  }

  async [BoardCRUD.readAll](board: ReadAllBoardsQuery): Promise<BoardProps[]> {
    return this.boardModel.find({ owner_sub: board.owner_sub });
  }

  async [BoardCRUD.delete](board: DeleteBoardMutation): Promise<BoardProps> {
    return await this.boardModel.findByIdAndRemove({ _id: board._id }).exec();
  }
}
