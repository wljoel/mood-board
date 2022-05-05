import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BoardList from './containers/board-list/BoardList.container';
import Board from './containers/Board/Board.container';
import Home from './containers/home/Home.container';
import Login from './containers/login/Login.container';
import Logout from './containers/logout/Logout.container';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/boards" element={<BoardList />} />
      <Route path="/board/:_id" element={<Board />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default AppRoutes;
