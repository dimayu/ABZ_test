import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../../Store/Slices/Users';
import { FormRegistration, Header, Home, Users } from '../../Components/index';

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Home/>
        <Users/>
        <FormRegistration/>
      </main>
    </div>
  );
};
