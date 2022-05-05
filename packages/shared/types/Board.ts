import { ItemProps } from './Item';

export interface BoardProps {
  _id: string;
  title: string;
  items: ItemProps[];
  creationDate: string;
  modificationDate: string;
  owner_sub: string;
}

export interface CreateBoardMutation {
  title: string;
  owner_sub: string;
}

export interface ReadBoardQuery {
  _id: string;
}

export interface ReadAllBoardsQuery {
  owner_sub: string;
}

export interface DeleteBoardMutation {
  _id: string;
}
