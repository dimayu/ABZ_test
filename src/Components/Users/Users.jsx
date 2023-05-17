import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchUsers } from '../../Store/Slices/Users';
import { Loader, User } from '../index';

import './Users.scss';

export const Users = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(6);
  const totalCount = useSelector(state => state.users.users.items.total_users);
  
  useEffect(() => {
    dispatch(fetchUsers(count));
  }, [dispatch, count]);
  
  const users = useSelector(state => state.users.users.items.users);
  const isLoaded = useSelector(state => state.users.users.status) === "loaded";
  
  let filterUsers = [];
  
  if (isLoaded) {
    filterUsers = [...users]?.sort((a, b) => (b.registration_timestamp - a.registration_timestamp));
  }
  
  const handleClickCount = () => {
    setCount(prev => prev + 6);
  }
  
  return (
    <section className="section section__users" id="users">
      <div className="wrapper">
        <h2 className="section__title">Working with GET request</h2>
        {
          isLoaded
            ? <div className="users">
              {filterUsers.map(item => (
                <User key={item.id} item={item}/>
              ))}
            </div>
            : <Loader/>
        }
        {
          (count < totalCount)
          && <button className="btn" onClick={handleClickCount}>Show more</button>
        }
      </div>
    </section>
  );
};