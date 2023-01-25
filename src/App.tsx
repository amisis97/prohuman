import React from 'react';
import { UserList } from './features/user';
import './assets/style.scss';

const App = () => {
  return (
    <section>
      <h1 className='content-box'>Random felhasználók</h1>
      <UserList />
    </section>
  );
};

export default App;
