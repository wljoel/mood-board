import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardCRUD } from '../../../../shared/constants';
import {
  BoardProps,
  CreateBoardMutation,
  DeleteBoardMutation,
  ReadAllBoardsQuery,
  ReadBoardQuery,
} from '../../../../shared/types/Board';
import {
  CreateItemMutation,
  DeleteItemMutation,
  UpdateItemMutation,
} from '../../../../shared/types/Item';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async [BoardCRUD.create](
    @Body() board: CreateBoardMutation,
  ): Promise<BoardProps> {
    return await this.boardsService[BoardCRUD.create](board);
  }

  @Post('item')
  async [BoardCRUD.createItem](
    @Body() item: CreateItemMutation,
  ): Promise<BoardProps> {
    return await this.boardsService[BoardCRUD.createItem](item);
  }

  @Patch('item')
  async [BoardCRUD.updateItem](
    @Body() item: UpdateItemMutation,
  ): Promise<BoardProps> {
    return await this.boardsService[BoardCRUD.updateItem](item);
  }

  @Delete('item')
  async [BoardCRUD.deleteItem](
    @Body() item: DeleteItemMutation,
  ): Promise<BoardProps> {
    return await this.boardsService[BoardCRUD.deleteItem](item);
  }

  @Get(':_id')
  async [BoardCRUD.read](@Param() board: ReadBoardQuery): Promise<BoardProps> {
    return await this.boardsService[BoardCRUD.read](board);
  }

  @Get('all/:owner_sub')
  async [BoardCRUD.readAll](
    @Param() board: ReadAllBoardsQuery,
  ): Promise<BoardProps[]> {
    return await this.boardsService[BoardCRUD.readAll](board);
  }

  @Delete(':_id')
  [BoardCRUD.delete](@Param() board: DeleteBoardMutation): Promise<BoardProps> {
    return this.boardsService[BoardCRUD.delete](board);
  }
}
