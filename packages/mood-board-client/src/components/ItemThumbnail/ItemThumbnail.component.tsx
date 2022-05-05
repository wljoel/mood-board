import React, { useState } from 'react';

import type {
  ItemProps,
  UpdateItemMutation,
} from '../../../../shared/types/Item';
import {
  useDeleteItemMutation,
  useUpdateItemMutation,
} from '../../services/boards/Boards.service';

const ItemThumbnail: React.FC<
  ItemProps & { board_id: string; refetch: () => void }
> = ({ id, board_id, title, imageUrl, note, refetch }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [deleteItemMutation] = useDeleteItemMutation();
  const [updateItemMutation] = useUpdateItemMutation();

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl);
  const [updatedNote, setUpdatedNote] = useState(note);

  const updateItem = () => {
    if (!updateMode) {
      setUpdateMode(true);
    } else {
      if (updatedTitle !== title || updatedNote !== note) {
        const updatedItem: UpdateItemMutation = {
          id,
          board_id,
          title: updatedTitle,
          imageUrl: updatedImageUrl,
          note: updatedNote,
        };

        updateItemMutation(updatedItem);

        setTimeout(() => {
          setUpdateMode(false);
          refetch && refetch();
        }, 200);
      } else {
        setUpdateMode(false);
      }
    }
  };

  const deleteItem = () => {
    deleteItemMutation({ board_id, id });
    setTimeout(() => {
      refetch();
    }, 200);
  };

  return (
    <div className="fill-available flex flex-col justify-between rounded-2xl border-2 border-dotted border-emerald-200 p-5">
      <div className="flex justify-between">
        <h2
          className={`${
            updateMode
              ? 'border-blue-300 bg-zinc-200'
              : 'border-transparent bg-none'
          } mt-0 rounded-2xl border-2 border-solid  p-2`}
          contentEditable={updateMode}
          onInput={(e) => setUpdatedTitle(e.target.innerText)}
        >
          {title}
        </h2>
        <div className="">
          {deleteMode ? (
            <div>
              <i>Are you sure?</i>
              <button className="mx-2 bg-red-500" onClick={deleteItem}>
                Yes
              </button>
              <button onClick={() => setDeleteMode(false)}>No</button>
            </div>
          ) : (
            <>
              <button className="mr-2" onClick={updateItem}>
                {updateMode ? 'Updating...' : 'Update'}
              </button>
              <button
                disabled={updateMode}
                className={`${updateMode ? 'bg-zinc-400' : 'bg-red-500'}`}
                onClick={() => setDeleteMode(true)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <img className="my-7 w-full" src={imageUrl} alt={title} />
      <p
        className={`${
          updateMode
            ? 'border-blue-300 bg-zinc-200'
            : 'border-transparent bg-none'
        } rounded-2xl border-2 border-solid p-2 text-center`}
        contentEditable={updateMode}
        onInput={(e) => setUpdatedNote(e.target.innerText)}
      >
        {note}
      </p>
    </div>
  );
};

export default ItemThumbnail;
