import React from 'react';
import { useSelector } from 'react-redux';

import type { CreateBoardMutation } from '../../../../shared/types/Board';
import AddButton from '../../atomic/AddButton/AddButton.component';
import useInput from '../../hooks/useInput/useInput.hook';
import { useCreateBoardMutation } from '../../services/boards/Boards.service';
import type { RootState } from '../../store';
import type { ButtonClickEvent } from '../../types/types';

const AddBoard: React.FC<{ refetch?: () => void }> = ({ refetch }) => {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput();

  const [createBoardMutation] = useCreateBoardMutation();

  const { currentUser } = useSelector((state: RootState) => state.auth);

  const createBoard = (event: ButtonClickEvent) => {
    event.preventDefault();
    const newBoard: CreateBoardMutation = {
      title: title,
      owner_sub: currentUser?.sub as string,
    };

    createBoardMutation(newBoard);

    resetTitle();

    setTimeout(() => {
      refetch && refetch();
    }, 200);
  };

  return (
    <>
      <form className="fill-available flex flex-col items-center justify-center rounded-2xl border-4 border-dashed border-emerald-200 p-5 drop-shadow-lg">
        <label>
          Title:
          <input className="mt-1 mb-7 block" type="text" {...bindTitle} />
        </label>
        <AddButton disabled={!title} onClick={(e) => createBoard(e)} />
      </form>
    </>
  );
};

export default AddBoard;
