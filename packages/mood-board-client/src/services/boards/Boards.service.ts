import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL, BoardCRUD } from '../../../../shared/constants';
import type {
  BoardProps,
  CreateBoardMutation,
  DeleteBoardMutation,
  ReadAllBoardsQuery,
  ReadBoardQuery,
} from '../../../../shared/types/Board';
import type {
  CreateItemMutation,
  DeleteItemMutation,
  UpdateItemMutation,
} from '../../../../shared/types/Item';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL + 'boards/' }),
  tagTypes: ['Get', 'Post', 'Delete'],
  endpoints: (builder) => ({
    [BoardCRUD.create]: builder.mutation<BoardProps, CreateBoardMutation>({
      query: (board: CreateBoardMutation) => ({
        url: '',
        method: 'POST',
        body: board,
      }),
    }),
    [BoardCRUD.createItem]: builder.mutation<BoardProps, CreateItemMutation>({
      query: (item: CreateItemMutation) => ({
        url: 'item',
        method: 'POST',
        body: item,
      }),
    }),
    [BoardCRUD.updateItem]: builder.mutation<BoardProps, UpdateItemMutation>({
      query: (item: UpdateItemMutation) => ({
        url: 'item',
        method: 'PATCH',
        body: item,
      }),
    }),
    [BoardCRUD.deleteItem]: builder.mutation<BoardProps, DeleteItemMutation>({
      query: (item: DeleteItemMutation) => ({
        url: 'item',
        method: 'DELETE',
        body: item,
      }),
    }),
    [BoardCRUD.read]: builder.query<BoardProps, ReadBoardQuery>({
      query: (board: ReadBoardQuery) => ({
        url: board._id,
        method: 'GET',
      }),
    }),
    [BoardCRUD.readAll]: builder.query<BoardProps[], ReadAllBoardsQuery>({
      query: (board: ReadAllBoardsQuery) => ({
        url: 'all/' + board.owner_sub,
        method: 'GET',
      }),
    }),
    [BoardCRUD.delete]: builder.mutation<BoardProps, DeleteBoardMutation>({
      query: (board: DeleteBoardMutation) => ({
        url: '' + board._id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  // @ts-ignore
  useCreateBoardMutation,
  // @ts-ignore
  useCreateItemMutation,
  // @ts-ignore
  useUpdateItemMutation,
  // @ts-ignore
  useDeleteItemMutation,
  // @ts-ignore
  useReadBoardQuery,
  // @ts-ignore
  useReadAllBoardsQuery,
  // @ts-ignore
  useDeleteBoardMutation,
} = boardsApi;
