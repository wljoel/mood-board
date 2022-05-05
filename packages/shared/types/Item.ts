export interface ItemProps {
  id: string;
  title: string;
  imageUrl: string;
  note: string;
}

export interface CreateItemMutation {
  board_id: string;
  title: string;
  imageUrl: string;
  note: string;
}

export interface UpdateItemMutation extends CreateItemMutation {
  id: string;
}

export interface DeleteItemMutation {
  board_id: string;
  id: string;
}
