import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import type { BoardProps } from '../../../../shared/types/Board';
import { useDeleteBoardMutation } from '../../services/boards/Boards.service';

const getDate = (date: string) => {
  return new Date(date).toLocaleDateString('en', { dateStyle: 'full' });
};

const BoardThumbnail: React.FC<BoardProps & { refetch: () => void }> = ({
  _id,
  title,
  items,
  creationDate,
  modificationDate,
  owner_sub,
  refetch,
}) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteBoardMutation] = useDeleteBoardMutation();

  const deleteBoard = () => {
    deleteBoardMutation({ _id });
    setTimeout(() => {
      refetch();
    }, 200);
  };

  return (
    <div className="fill-available rounded-2xl border-2 border-solid border-emerald-200 p-5 drop-shadow-lg">
      <div className="flex justify-between">
        <h2 className="mt-0">{title}</h2>
        <span>{items?.length ? items.length + ' item/s' : 'No items'}</span>
      </div>
      <div className="mt-2 mb-4">
        <p className="mb-2">
          <b>Created:</b>
          <br />
          {getDate(creationDate)}
        </p>
        <p>
          <b>Modified:</b>
          <br />
          {getDate(modificationDate)}
        </p>
      </div>
      <div className="flex justify-between">
        {deleteMode ? (
          <div className="flex w-full items-center justify-between">
            <i>Are you sure?</i>
            <div>
              <button className="mx-2 bg-red-500" onClick={deleteBoard}>
                Yes
              </button>
              <button onClick={() => setDeleteMode(false)}>No</button>
            </div>
          </div>
        ) : (
          <>
            <Link to={`/board/${_id}`}>
              <button>Open board</button>
            </Link>
            <button className="bg-red-500" onClick={() => setDeleteMode(true)}>
              Delete board
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardThumbnail;
