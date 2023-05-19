import { useEffect, useState } from 'react';

import { Loader, User } from '../index';
import { getUsers } from '../../API/API';

import './Users.scss';

export const Users = () => {
  const [count, setCount] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleClickCount = () => {
    setCount(prev => prev + 1);
  };
  
  useEffect(() => {
    getUsers(count).then(data => {
        if (data) {
          const users = data.users;
          const sortedUsers = users.sort((a, b) => (b.registration_timestamp - a.registration_timestamp));
          setTotalCount(data.total_pages);
          setIsLoaded(true);
          
          if (count === 1) {
            setUsers(sortedUsers);
          } else {
            setUsers((prevState) => [...prevState, ...sortedUsers]);
          }
        }
      }
    );
  }, [count]);
  
  return (
    <section className="section section__users" id="users">
      <div className="wrapper">
        <h2 className="section__title">Working with GET request</h2>
        {
          isLoaded
            ? <div className="users">
              {users?.map(item => (
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