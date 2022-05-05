import React from 'react';
import { Link } from 'react-router-dom';

import type { ItemProps } from '../../../../shared/types/Item';
import AddItem from '../../components/AddItem/AddItem.component';
import Fallback from '../../components/Fallback/Fallback.component';
import ItemThumbnail from '../../components/ItemThumbnail/ItemThumbnail.component';
import { useReadBoardQuery } from '../../services/boards/Boards.service';

const Board: React.FC = () => {
  const param = window.location.pathname;
  const _id = param.substring(param.indexOf('d/') + 2, param.length);
  const { data: board, refetch } = useReadBoardQuery({ _id });

  return (
    <div className="mb-10 rounded-2xl border-solid border-emerald-400 p-10">
      <h2 className="mt-0 mb-10 drop-shadow-xl">
        <Link to={'/boards'} className="underline">
          My Mood Boards
        </Link>{' '}
        / {board?.title}
      </h2>
      {board?.items?.length ? (
        <div className="grid grid-cols-3 gap-10">
          {board?.items.map(({ id, title, imageUrl, note }: ItemProps) => (
            <ItemThumbnail
              key={id}
              id={id}
              board_id={_id}
              title={title}
              imageUrl={imageUrl}
              note={note}
              refetch={refetch}
            />
          ))}
          <AddItem _id={_id} refetch={refetch} />
        </div>
      ) : (
        <Fallback
          title={'Woops! Looks like this Mood Board has no items!'}
          subtitle={'Try adding one!'}
        >
          <AddItem _id={_id} refetch={refetch} />
        </Fallback>
      )}
    </div>
  );
};

export default Board;
