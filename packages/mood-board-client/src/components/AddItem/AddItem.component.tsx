import React from 'react';

import type { CreateItemMutation } from '../../../../shared/types/Item';
import AddButton from '../../atomic/AddButton/AddButton.component';
import useInput from '../../hooks/useInput/useInput.hook';
import { useCreateItemMutation } from '../../services/boards/Boards.service';
import type { ButtonClickEvent } from '../../types/types';

const AddItem: React.FC<{ _id: string; refetch?: () => void }> = ({
  _id,
  refetch,
}) => {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput();
  const {
    value: imageUrl,
    bind: bindImageUrl,
    reset: resetImageUrl,
  } = useInput();
  const { value: note, bind: bindNote, reset: resetNote } = useInput();

  const [createItemMutation] = useCreateItemMutation();

  const createItem = (event: ButtonClickEvent) => {
    event.preventDefault();
    const newItem: CreateItemMutation = {
      board_id: _id,
      title,
      imageUrl,
      note,
    };

    createItemMutation(newItem);

    resetTitle();
    resetImageUrl();
    resetNote();

    setTimeout(() => {
      refetch && refetch();
    }, 200);
  };

  return (
    <>
      <form className="fill-available flex flex-col items-center justify-center rounded-2xl border-4 border-dashed border-emerald-200 p-5 drop-shadow-lg">
        <label>
          Title:
          <input className="mt-1 mb-3 block" type="text" {...bindTitle} />
        </label>
        <label>
          Image URL:
          <input className="mt-1 mb-3 block" type="text" {...bindImageUrl} />
        </label>
        <label>
          Note:
          <input className="mt-1 mb-10 block" type="text" {...bindNote} />
        </label>
        <AddButton
          disabled={!title || !imageUrl || !note}
          onClick={(e) => createItem(e)}
        />
      </form>
    </>
  );
};

export default AddItem;
