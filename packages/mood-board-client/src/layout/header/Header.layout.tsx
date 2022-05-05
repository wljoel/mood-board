import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootState } from '../../store';

const Header: React.FC = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky top-0 z-10 mb-5 flex items-center justify-between bg-emerald-100 p-10">
      <Link to="/">
        <h1>Mood Board App</h1>
      </Link>
      <div className="flex justify-between">
        {authenticated ? (
          <>
            <Link to="/boards" className="mr-10">
              My boards
            </Link>
            <Link to="/logout">Sign out</Link>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
