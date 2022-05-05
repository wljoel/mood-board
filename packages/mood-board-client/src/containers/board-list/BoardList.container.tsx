import React from 'react';
import { useSelector } from 'react-redux';

import type { BoardProps } from '../../../../shared/types/Board';
import AddBoard from '../../components/AddBoard/AddBoard.component';
import BoardThumbnail from '../../components/BoardThumbnail/BoardThumbnail.component';
import Fallback from '../../components/Fallback/Fallback.component';
import { useReadAllBoardsQuery } from '../../services/boards/Boards.service';
import type { RootState } from '../../store';

const BoardList: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const { data: boards, refetch } = useReadAllBoardsQuery({
    owner_sub: currentUser?.sub,
  });

  return (
    <div className="mb-10 rounded-2xl border-solid border-emerald-400 p-10">
      <h2 className="mt-0 mb-10 text-center drop-shadow-xl">My boards</h2>
      {boards?.length ? (
        <div className="grid grid-cols-3 place-items-center gap-10 ">
          {boards?.map(
            ({
              _id,
              title,
              items,
              creationDate,
              modificationDate,
              owner_sub,
            }: BoardProps) => (
              <BoardThumbnail
                key={_id}
                _id={_id}
                title={title}
                items={items}
                creationDate={creationDate}
                modificationDate={modificationDate}
                owner_sub={owner_sub}
                refetch={refetch}
              />
            )
          )}
          <AddBoard refetch={refetch} />
        </div>
      ) : (
        <Fallback
          title="Woah! You have no Mood Boards just yet!"
          subtitle="Try adding one!"
        >
          <AddBoard refetch={refetch} />
        </Fallback>
      )}
    </div>
  );
};

export default BoardList;
